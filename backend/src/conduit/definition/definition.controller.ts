import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { ListConduitDefinitionsRequestDTO } from 'src/conduit/definition/list-definitions-request.dto';
import { InputSchemaService } from 'src/conduit/input-schema/input-schema.service';

@Controller()
export class ConduitDefinitionController {
  @UseGuards(JwtAuthGuard)
  @Post('conduit-definition/list')
  async listConduitDefinitions(
    @Body() request: ListConduitDefinitionsRequestDTO,
  ) {
    const { count, items } = await this.conduitDefinitionService.list({
      limit: request.limit,
      page: request.page,
      orderBy: request.orderBy ?? 'name',
      orderDirection: request.orderDirection ?? 'ASC',
    });
    return {
      count,
      items: items.map((item) => ({
        id: item.id,
        author: item.author,
        createdAt: item.createdAt,
        name: item.name,
      })),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('conduit-definition/:id')
  async getConduitDefinition(@Param('id') id: string) {
    const conduitDefinition = await this.conduitDefinitionService.findById(id);
    return conduitDefinition;
  }

  @UseGuards(JwtAuthGuard)
  @Get('conduit-definition/:id/schema')
  async getConduitDefinitionSchema(@Param('id') id: string) {
    const { schemaId } = await this.conduitDefinitionService.findSchemaById(id);
    const inputSchema = await this.inputSchemaService.findById(schemaId);
    return inputSchema;
  }

  constructor(
    private conduitDefinitionService: ConduitDefinitionService,
    private inputSchemaService: InputSchemaService,
  ) {}
}
