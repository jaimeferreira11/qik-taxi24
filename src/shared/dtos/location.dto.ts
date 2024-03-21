import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class LocationDto {
  @ApiProperty({
    example: '-25.2800459',
    description: 'Latitude coordinates',
    default: undefined,
    required: false,
  })
  @IsNotEmpty()
  @IsLongitude()
  @IsNumber()
  @Max(90)
  @Min(-90)
  latitude: number;

  @ApiProperty({
    example: '-57.6343814',
    description: 'Longitude coordinates',
    default: undefined,
    required: false,
  })
  @IsNotEmpty()
  @IsLatitude()
  @IsNumber()
  @Max(180)
  @Min(-180)
  longitude: number;
}
