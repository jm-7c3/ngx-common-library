import { HttpInterceptorFn } from '@angular/common/http';

export const spIntegrationInterceptor: HttpInterceptorFn = (req, next) => {
  const {body, method} = req;
  const headers: any = {};

  if (method === 'DELETE') {
    headers['If-Match'] = '*';
    headers['X-HTTP-Method'] = 'DELETE';
  } else if (method === 'POST') {
    headers['Accept'] = 'application/json;odata=verbose';
    headers['Content-Type'] = 'application/json;odata=verbose';

    if (body) {
      if (body instanceof File) {
        headers['Content-Length'] = body.size.toString();
        // headers['Content-Type'] = 'multipart/form-data';

        delete headers['Content-Type'];
      } else if ((body as any).Id || (body as any).ID) {
        headers['If-Match'] = '*';
        headers['X-HTTP-Method'] = 'MERGE';
      }
    }
  }

  return next(req.clone({ setHeaders: headers }));
};
