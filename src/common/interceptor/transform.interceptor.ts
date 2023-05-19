import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Convert Mongoose documents to plain objects
        if (Array.isArray(data)) {
          data = data.map((item) => {
            if (item && typeof item.toObject === 'function') {
              return item.toObject();
            }
            return item;
          });
        } else if (data && typeof data.toObject === 'function') {
          data = data.toObject();
        }

        return instanceToPlain(data, {
          excludePrefixes: ['_'],
        });
      }),
    );
  }
}
