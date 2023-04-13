import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { ListConduitDefinitionsRequestDTO } from 'src/conduit/definition/list-definitions-request.dto';

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

  constructor(private conduitDefinitionService: ConduitDefinitionService) {}
}
