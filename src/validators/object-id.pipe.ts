import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidationObjectId implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isValid: boolean = mongoose.Types.ObjectId.isValid(value);

    if (!isValid) throw new BadRequestException('Not object id');

    return value;
  }
}
