import { HttpInterceptorFn } from '@angular/common/http';

export const spFormDigestInterceptor: HttpInterceptorFn = (req, next) => {
  if (['POST'].includes(req.method)) {
    const formDigest = localStorage.getItem('formDigestValue') ?? '';

    return next(req.clone({ setHeaders: { 'X-RequestDigest': formDigest } }));
  }

  return next(req);
};
