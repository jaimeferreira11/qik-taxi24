import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Name of customer',
    nullable: false,
    minLength: 1,
    required: true,
  })
  @MinLength(1)
  @IsString()
  readonly customerName: string;

  @ApiProperty({
    description: 'Details',
    nullable: false,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsArray()
  readonly items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
}
