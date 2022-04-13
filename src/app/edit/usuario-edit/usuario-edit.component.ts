import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/UsuarioModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuarioModel: UsuarioModel = new UsuarioModel()
  idUsuario: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuarioModel.tipo = this.tipoUsuario
    if(this.usuarioModel.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    }else{
      this.authService.atualizar(this.usuarioModel).subscribe((resp: UsuarioModel) => {
        this.usuarioModel = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSucess('Usuário Atualizado com sucesso, faça o login novamente!')
        environment.token =''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      }) //Sobsescreve o ts e passa para json
    }
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: UsuarioModel) => {
      this.usuarioModel = resp
    })
  }

}
