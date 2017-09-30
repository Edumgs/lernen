export class Alumno {
    username: String;
    password: String;
    firstname: String;
    lastname: String;
    email: String;
    auth: String;
    lang: String;
    idnumber: String;
    timezone: String;
    mailformat: String;
    description: String;
    city: String;
    country: String;
    
    constructor(user:String,password:string,firstname:string,lasname:string,
    email:string,idnumber:string,description:string,city:string){
        this.username=user;
        this.password=password;
        this.firstname=firstname;
        this.lastname=lasname;
        this.email=email;
        this.auth="manual";
        this.lang="es";
        this.idnumber=idnumber;
        this.timezone="-12.5";
        this.description=description;
        this.city=city;
        this.country="py";
        this.mailformat="0";
    }
}
export class ErrorMessage {
    classe:String;
    debugInfo:String;
    errocode:String;
    message:String;
    constructor(){
        this.classe="";
        this.debugInfo="";
        this.errocode="";
        this.message="";
    }
}
export class ExitoMessage {
    id:String;
    username:String;

    constructor(){
        this.id="";
        this.username="";
    }
}