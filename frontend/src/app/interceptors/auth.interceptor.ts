import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const publicUrls = ['/auth/', 'salon'];

  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (token && token !== 'null' && token !== 'undefined' && !isPublicUrl) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return next(authReq);
  }

  return next(req);
};

