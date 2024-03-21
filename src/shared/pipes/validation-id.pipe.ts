import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidationIdPipe implements PipeTransform {
  transform(value: string | number) {
    if (typeof value === 'number') {
      if (value < 1)
        throw new BadRequestException(`${value} is not a valid sql Id`);
      return value;
    } else if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid  mongo Id`);
    }
    return value;
  }
}
