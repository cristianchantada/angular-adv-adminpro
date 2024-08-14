import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginInterface } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('cristianchantada@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { nombre, email, password, role, google, img, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true
        }),
        catchError((err) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role,
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    })

  }

  login(formData: LoginInterface) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logingGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        console.log(resp);

        localStorage.setItem('token', resp.token);
      })
    );
  }


}
