import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../service/auth.service';

export const tokenSendInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login')) return next(req);
  const authService = inject(AuthService)
  const jwt = localStorage.getItem('TOKEN_JWT');
  const decode = jwtDecode(jwt || '');
  const timeNow = Math.floor(Date.now()/1000);
  let exp = decode.exp || timeNow;
  if( exp < timeNow) authService.logout()

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return next(authReq);
};
