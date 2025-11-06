export class User {
    constructor(
        public id: string,
        public dni: number,
        public nombre: string,
        public apellido: string,
        public idRol: number,
        public email: string,
        public contrasenia: string,
        public isLogged: boolean

    ) { }
}