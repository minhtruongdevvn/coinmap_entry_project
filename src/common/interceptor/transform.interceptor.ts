import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { decamelizeKeys } from 'fast-case';
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
              return decamelizeKeys(item.toObject());
            }
            return decamelizeKeys(item);
          });
        } else if (data && typeof data.toObject === 'function') {
          data = decamelizeKeys(data.toObject());
        }

        return data;
      }),
    );
  }
}
