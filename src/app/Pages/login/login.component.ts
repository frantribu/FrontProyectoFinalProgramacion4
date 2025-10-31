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
    password:['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$")]]
  })

  login(){
    const email=this.formLogin.value.email;
    const password=this.formLogin.value.password;

    this.usuarioService.getUserByEmail(email!).subscribe({
      next:(user)=>{
        if(!user){
          this.mensaje="Usuario no encontrado"
        }else if(user[0].password===password){
          //this.usuarioService.isLogged.set(true)
          this.mensaje="Login exitoso"
        }else{
          this.mensaje="Contraseña o email incorrecto"
        }
      },
    error:(err)=>console.log("Error al buscar usuario", err)
    }
    )

    
  }
}
function toSignal(arg0: Subscription) {
  throw new Error('Function not implemented.');
}

