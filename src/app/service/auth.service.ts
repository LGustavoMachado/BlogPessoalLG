import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    
  }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://hagemotosblog.herokuapp.com/usuarios/logar', usuarioLogin)
  }
  cadastrar(usuarioModel: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://hagemotosblog.herokuapp.com/usuarios/cadastrar', usuarioModel)
  }
  atualizar(usuarioModel: UsuarioModel): Observable<UsuarioModel>{
    return this.http.put<UsuarioModel>('https://hagemotosblog.herokuapp.com/usuarios/atualizar', usuarioModel)
  }
  getByIdUsuario(id: number): Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`https://hagemotosblog.herokuapp.com/usuarios/${id}`)
  }
  

  //Verifica se tem um token no enviroment
  logado(){
    let ok: boolean = false;

    if(environment.token != ''){
      ok = true;
    }

    return ok;    
  }
}
