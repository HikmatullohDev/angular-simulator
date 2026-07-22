import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http'; 
import { tap } from 'rxjs'; 

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => { 
  const startTime: number = Date.now();

  const logRequest = (result: 'request' | 'error', status: number) => {
    console.log(`HTTP ${result}`, {
      method: req.method,
      url: req.url,
      status: status,
      responseTime: Date.now() - startTime
    });
  }

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => { 
        if (event instanceof HttpResponse) { 
          logRequest('request', event.status);
        } 
      },
      error: (error: HttpErrorResponse) => { 
        logRequest('error', error.status);
      }
    })
  ); 
};