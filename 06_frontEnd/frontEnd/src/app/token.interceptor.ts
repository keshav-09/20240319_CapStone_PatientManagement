import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let httpClient=inject(HttpClient)
  const token =localStorage.getItem('token')
  if(token){
    let decodedToken=jwtDecode(token);
    const isExpir=decodedToken && decodedToken.exp 
    ? decodedToken.exp<Date.now()/1000:false

    if (isExpir){
      console.log("Token Expire");
      httpClient.post('http://localhost:3000/refresh',{}).subscribe((newToken:any )=>{
        localStorage.setItem('token',newToken);
        req.clone({
          setHeaders:{
          Authorization :`Bearer ${newToken}`
          }
        })
      });
      return next(req);
    }
    else {
      console.log("token is not expire")
    }

  } 
  return next(req);
};
