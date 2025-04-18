import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  private router = inject(Router);
  private authService = inject(AuthService)

  errorMessage = '';


  submitForm() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const isLoggedIn = this.authService.login(username, password);

      if (isLoggedIn) {
        this.router.navigate(['']); // redirection vers la home par exemple
      } else {
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";

      }
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
