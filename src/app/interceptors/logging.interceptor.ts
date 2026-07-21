import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http'; 
import { tap } from 'rxjs'; 

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => { 
  const startTime: number = Date.now(); 
  
  return next(req).pipe( 
    tap({
      next: (event: HttpEvent<unknown>) => { 
        if (event instanceof HttpResponse) { 
          const duration: number = Date.now() - startTime; 
          console.log('HTTP request', { 
            method: req.method, 
            url: req.url, 
            status: event.status, 
            responseTime: duration 
          }); 
        } 
      },
      error: (error: HttpErrorResponse) => { 
        const duration: number = Date.now() - startTime; 
        console.log('HTTP error', { 
          method: req.method, 
          url: req.url, 
          status: error.status, 
          responseTime: duration 
        }); 
      }
    })
  ); 
};