import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,RequestOptionsArgs,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Alumno,ErrorMessage,ExitoMessage } from './registro.model';
import { CiudadesService } from '../servicio/ciudades.service';

@Injectable()

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public alumno:Alumno;
  public cuerpoRespuesta:any;
  public tipoRespuesta:any;
  public checkbox:Boolean;
  public segundaContrasenha:string;
  public ciudades: any[];
  public errorUser: string = "Error";
  public errorEmail: string = "Error";
  public errorEmailInvalid: string = "Error";

  //Banderas de tipo de sucesos
  public exito:Boolean; // se registro correctamente el alumno
  public error:Boolean; //hubo un error
  public envio:Boolean; //se realizo el envio

  public mensajeErrorContrasenha:String;
  public mensajeExito:ExitoMessage;
  public mensajeError:ErrorMessage;

  constructor(private http:Http, private ciudadesService: CiudadesService) { 
    this.ciudadesService.getCiudades().then(ciudad => {this.ciudades = ciudad});
    this.alumno= new Alumno("","","","","","","","");
    this.checkbox=false;
    this.exito=false;
    this.error=false;
    this.envio=false;
    this.mensajeError= new ErrorMessage();
    this.mensajeExito = new ExitoMessage();
    this.mensajeErrorContrasenha="Su contraseña debe tener al menos 8 caraceteres y entre ellos al menos: Un numero, Un caracter en mayuscula, Un no alfanumerico como _ # . etc";
  }

  ngOnInit() {
  }

  establecerConexion(){
    // aun no sucede nada
    this.alumno.idnumber=this.alumno.username+Date.now().toString(); //completa el idnumber (inutil pero pide moodle)
    this.alumno.description="Usuario de prueba"; // coloca una descripcion (se puede dejar en blanco)
    
    console.log("entro al establecerConexion");
    /*console.log(this.validarNombreApellido(this.alumno.firstname,this.alumno.lastname));
    console.log(this.segundaContrasenha);
    console.log(this.validarConstraseñas(this.alumno.password,this.segundaContrasenha));
    console.log(this.checkbox);*/

    let body = JSON.stringify(this.alumno);
    let headers = new Headers([{ 'Content-Type': 'application/json' },
    { 'Access-Control-Allow-Origin': '*' },
    { 'Access-Control-Allow-Headers': 'Content-Type' },
    { 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' }]);
    let options = new RequestOptions({ headers: headers });
    return this.http
    .post('http://localhost:8080/Lernen/rest/api/usuarios', this.alumno, options)
    .map(res=>{
      this.tipoRespuesta=res.status;
      this.cuerpoRespuesta=res.json();
      console.log(this.cuerpoRespuesta);
      this.envio=true;
      this.segundaContrasenha="";
      if(this.tipoRespuesta==200){
        this.exito=true;
        console.log(this.cuerpoRespuesta.username);
        console.log(this.cuerpoRespuesta.id);
        this.mensajeExito=this.cuerpoRespuesta;
        this.alumno = new Alumno("","","","","","","","");
      }else{
        this.errorUser = "Username already exists: " + this.alumno.username;
        this.errorEmail = "Email address already exists: " + this.alumno.email;
        this.errorEmailInvalid = "Email address is invalid: " + this.alumno.email; 
  
        this.error=true;
        this.mensajeError=this.cuerpoRespuesta;
        console.log(this.cuerpoRespuesta.message);
        console.log(this.cuerpoRespuesta.classe);
        if(this.mensajeError.debugInfo){
          console.log(this.mensajeError.debugInfo);
        }
      }
    });  
    
  }
  mostrarExito(){
    return (this.exito && this.envio); 
  }
  mostrarError(){
    return (this.error && this.envio); 
  }
  mostrarErrorPreEnvio(){
    return (this.error && !this.envio); 
  }
  enviarDatos(){
    this.envio=false;
    this.error=false;
    this.exito=false;
    this.mensajeError.message="";
    console.log("Envio: "+this.envio);
    if(this.validar()){ //paso el primer filtro?
      this.establecerConexion().subscribe(post=>{
      this.cuerpoRespuesta = post;});
    }else{
      console.log("Error: "+this.error);
      console.log("Mensaje: "+this.mensajeError.message);
      if(!this.validarConstraseñas(this.alumno.password,this.segundaContrasenha)){
        this.mensajeError.message+="Las contraseñas deben ser iguales.";
      }
      if(!this.checkbox){
        this.mensajeError.message+=" Debe aprovar los terminos y condiciones de uso. ";
      }
      console.log("Mensaje: "+this.mensajeError.message);
      console.log("Error: "+this.error);
      console.log("Envio: "+this.envio);
      console.log(this.mostrarError());
      console.log(this.mostrarExito());
      console.log(this.mostrarErrorPreEnvio());
   }
  }
  
  validar(){
    if(!this.validarConstraseñas(this.alumno.password,this.segundaContrasenha) || !this.checkbox){
        this.error=true;
        console.log("Encontro el error");
        return false;
     }
    return true;
  }
  
  validarConstraseñas(contraseña1,contraseña2){
    return contraseña1==contraseña2;
  }

}
