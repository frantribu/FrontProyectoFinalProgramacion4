export interface User {
    id: string,
    dni: number,
    nombre: string,
    apellido: string,
    idRol: number,
    email: string,
    contrasenia: string,
    isLogged: boolean
}