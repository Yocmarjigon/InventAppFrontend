import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticate = false;
  private url = 'https://inventappbackend.onrender.com/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public login(user: any) {
    this.http.post<AuthUser>(`${this.url}/login`, user).subscribe({
      next: (res) => {
        this.isAuthenticate = true;
        localStorage.setItem("TOKEN_JWT", res.jwt)
        this.router.navigate(["/home"])
      },
      error: (err) => {
        console.log(err);
        this.isAuthenticate =false;
      },
    });
  }

  public logout(){
    localStorage.removeItem("TOKEN_JWT");
    this.isAuthenticate = false;
    this.router.navigate(["/login"])
  }

  public isAuthenticated():boolean {
    return this.isAuthenticate || !!localStorage.getItem("TOKEN_JWT");
  }
}
