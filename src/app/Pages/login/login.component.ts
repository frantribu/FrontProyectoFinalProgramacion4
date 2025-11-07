import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../Core/Services/UserService/user-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb=inject(FormBuilder)
  usuarioService=inject(UserServiceService)
  mensaje:string=""
  router=inject(Router)

  formLogin=this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@miempresa\\.com$")]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
  })

  login(){
    const email=this.formLogin.value.email;
    const password=this.formLogin.value.password;

    this.usuarioService.getUserByEmail(email!).subscribe({
      next:(user)=>{
        if(user.length===0){
          this.mensaje="Usuario no encontrado"
        }else if(user[0].contrasenia===password){
          this.usuarioService.updateIsLogged(user[0])
          this.usuarioService.guardarUsuarioEnSesion(user[0])
          this.mensaje="Login exitoso"
        }else{
          this.mensaje="Contraseña o email incorrecto"
        }
      },
    error:(err)=>console.log("Error al buscar usuario", err)
    }
    )
  }

  logout(){
    const user=this.usuarioService.obtenerUsuarioEnSesion();

    if(user){
      this.usuarioService.updateIsLogged(user)
      this.usuarioService.cerrarSesion()
    }else{
      this.mensaje="No hay sesion activa"
    }
  }
}


