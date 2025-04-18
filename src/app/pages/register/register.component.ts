import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,  Validators.email]),
    password: new FormControl('', Validators.required)
  })

  private router = inject(Router);
  private authService = inject(AuthService);


  submitForm(){
    if(this.registerForm.valid){
      
      const formValue = this.registerForm.value;

      const newUser: User = {
        id: crypto.randomUUID(), 
        username: formValue.username,
        email: formValue.email,
        password: formValue.password

      }

      this.authService.saveUser(newUser); 
      this.router.navigate(['/login']);
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
