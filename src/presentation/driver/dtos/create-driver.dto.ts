import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    example: 'Jaime',
    description: 'Name of driver',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  readonly name: string;
}
