import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      console.error('Error global', err);
      return throwError(() => err);
    })
  );
};
