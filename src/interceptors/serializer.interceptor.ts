import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SerializerInterceptor
  extends ClassSerializerInterceptor
  implements NestInterceptor
{
  protected getContextOptions(
    context: ExecutionContext,
  ): ClassTransformOptions {
    const superOptions = super.getContextOptions(context);
    const customOption: ClassTransformOptions = {};
    return { ...superOptions, ...customOption };
  }
}
