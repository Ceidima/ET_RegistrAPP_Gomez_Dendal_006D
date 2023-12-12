export interface IEstudiantes {
    id: number,
    nombre: string,
    rut: string,
    correo: string,
    jornada: string,
    asignatura: string,
    asignatura2: string
}

export interface IEstudiante {
    nombre: string,
    rut: string,
    correo: string,
    jornada: string,
    asignatura: string,
    asignatura2: string
}

export interface Usuarios {
    id: number,
    correo: string,
    contraseña: string
}

export interface Users{
    id:number;
    username: string;
    password: string;
    rut:string;
    correo:string;
    materia1:string;
    materia2:string;
    rol: string;
    isactive: boolean;
}
//post 
export interface User{
    username: string;
    password: string;
    rut: string;
    correo: string;
    materia1: string;
    materia2: string;
    rol: string;
    isactive: boolean;
} 

//guardado de qr
export interface qrcode{
    username: string;
    correo: string;
    materia: string;
    fecha: string;
}

export interface qrcodes{
    id:number;
    username: string;
    correo: string;
    materia: string;
    fecha: string;
}

//noticias

export interface RespuestaToHeadLines{
    status: string;
    totalResults: number;
    articles:Article[];
}

export interface Article{
    source:Source;
    author?:String;
    title:String;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt:string;
    content?:string;
}

export interface Source{
    id?:string;
    name:string;
}
 


