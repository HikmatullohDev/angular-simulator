import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const duration: number = Date.now() - startTime
        console.log('request', { method: req.method, url: req.url, status: event.status, responseTime: duration })
      }
    })
  )
};