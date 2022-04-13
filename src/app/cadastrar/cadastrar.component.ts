import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuarioModel: UsuarioModel = new UsuarioModel()
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  //Pagina iniciar faça algo
  ngOnInit() {
    window.scroll(0,0) // fique no topo da página
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.usuarioModel.tipo = this.tipoUsuario
    if(this.usuarioModel.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    }else{
      this.authService.cadastrar(this.usuarioModel).subscribe((resp: UsuarioModel) => {
        this.usuarioModel = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSucess('Usuário Cadastrado com sucesso!')
      }) //Sobsescreve o ts e passa para json
    }
  }

}
