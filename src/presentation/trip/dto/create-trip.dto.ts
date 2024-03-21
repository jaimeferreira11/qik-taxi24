import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({
    description: 'Id of passenger',
    nullable: false,
    minLength: 1,
    required: true,
    example: '65fcc046cdf0aaa3a93276ca',
  })
  @IsString()
  @MinLength(1)
  readonly passengerId: string | number;

  @IsOptional()
  @MinLength(1)
  readonly driverId: string | number;
}
