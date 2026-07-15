import { HttpInterceptorFn } from '@angular/common/http';

export const adminTokenInterceptor: HttpInterceptorFn =
(req, next) => {

  const token =
    sessionStorage.getItem('token');

  if (token) {

    req = req.clone({

      setHeaders: {
        token
      }

    });

  }

  return next(req);

};