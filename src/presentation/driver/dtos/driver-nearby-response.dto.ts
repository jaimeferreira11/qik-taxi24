import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class DriverNearbyResponseDto {
  @ApiProperty({
    example: 'Jaime',
    description: 'Name of driver',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'true',
    description: 'State of driver',
    nullable: false,
  })
  @IsBoolean()
  available: boolean;

  @ApiProperty({
    example: '1.20',
    description: 'Distance in KM',
    required: false,
  })
  @IsNumber()
  distance?: number;

  @ApiProperty({
    example: '65fbab0432c111ed8676f82f',
    description: 'Identification',
  })
  @IsMongoId()
  id: string;

  @ApiProperty({
    example: '[-25.989, -58.8998]',
    description: 'Coordenadas de ubicacion',
  })
  @IsArray()
  geo: number[];
}
