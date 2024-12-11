import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('Interceptor triggered');
//     const token = localStorage.getItem('token');
//     console.log(token);
//     if (token) {
//       const clonedReq = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`),
//       });
//       return next.handle(clonedReq);
//     }

//     return next.handle(req);
//   }
// }

export const addTokenInterceptor = (req: HttpRequest<any>, next: any) => {
  console.log('Interceptor triggered');
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedReq);
  }

  return next(req);
};
