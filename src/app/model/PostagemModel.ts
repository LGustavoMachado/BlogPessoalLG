import { Tema } from "./Tema"
import { UsuarioModel } from "./UsuarioModel"

export class PostagemModel{
    
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public usuario: UsuarioModel
    public tema: Tema
}