import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: '10',
    description: 'Current page number',
    default: undefined,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit: number;

  @ApiProperty({
    example: '0',
    description: 'Page offset',
    default: undefined,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;
}
