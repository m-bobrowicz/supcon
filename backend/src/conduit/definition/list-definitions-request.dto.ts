import { Min, IsNumber, IsNotEmpty } from 'class-validator';

export class ListConduitDefinitionsRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  limit: number;
}
