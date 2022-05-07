import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [''],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  login() {
    this.afAuth
      .signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then((resp) => {
        console.log('Usuario Logeado', resp);
      })
      .catch((resp) => {
        /* console.log('Error al logearse',resp); */
        switch (resp.code) {
          case 'auth/user-not-found':
            console.log('El usuario no existe');
            break;
          case 'auth/wrong-password':
            console.log('La contraseña es incorrecta');
            break;
          case 'auth/invalid-email':
            console.log('El email es invalido');
            break;
          default:
            console.log('Error desconocido');
            break;
        }
      });
  }

  loginWithGoogle() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((resp) => {
        console.log("BBBB",resp);
      })
      .catch((err) => {
        /* console.log("AAAAAAA",err); */
        switch (err.code) {
          case "auth/popup-closed-by-user":
            console.log("El usuario cancelo el login");
            break;
          case "auth/account-exists-with-different-credential":
            console.log("El usuario ya existe con otra credencial");
            break;
          default:
            console.log("Error desconocido");
            break;
        }
      });
  }
}
