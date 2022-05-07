import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/* import para registarse en firebase */
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [''],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  registrar() {
    this.afAuth.createUserWithEmailAndPassword(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then((resp) => {
        console.log('Usuario registrado',resp);
      })
      .catch((resp) => {
        /* console.log('Error al registrarse',resp); */
        switch (resp.code) {
          case 'auth/email-already-in-use':
            console.log('El email ya esta en uso');
            break;
          case 'auth/invalid-email':
            console.log('El email es invalido');
            break;
          case 'auth/operation-not-allowed':
            console.log('No se puede registrar');
            break;
          case 'auth/weak-password':
            console.log('La contraseña es muy debil');
            break;
          default:
            console.log('Error desconocido');
            break;
        }
      });
  }
}
