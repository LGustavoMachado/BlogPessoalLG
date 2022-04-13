import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';
import { Tema } from '../model/Tema';
import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  
  postagem: PostagemModel = new PostagemModel()
  listaPostagens: PostagemModel[]
  tituloPost: string
 

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  descricaoTema: string

  usuario: UsuarioModel = new UsuarioModel()
  idUsuario = environment.id

  key = 'data'
  reverse = true // o ultimo que eu postei vai para o primeiro da fila

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == '' ){
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
    this.findByIdUsuario()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[]) =>{
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: UsuarioModel) =>{
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
      this.alertas.showAlertSucess('Postagem realizada com sucesso!')
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.getAllPostagens()
    }else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: PostagemModel[]) =>{
        this.listaPostagens = resp
      })
    } 
  }

  findByDescricaoTema(){
    if(this.descricaoTema == ''){
      this.getAllTemas()
    }else{
      this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }
  }

}
