import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleAccess(request, next);
  }

  private handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const theEndPoint = environment.shopApiUrl + '/orders';
    const securedEndpoints = [theEndPoint];

    if (securedEndpoints.some((url) => request.urlWithParams.includes(url))) {
      // TODO: Implement your new authentication logic here
      // For now, we'll just pass the request through without modification
      // In the future, you might want to add an authentication token here

      // Example of how you might add an auth token:
      // const authToken = 'your-auth-token-here';
      // request = request.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${authToken}`,
      //   },
      // });
    }

    return next.handle(request);
  }
}
