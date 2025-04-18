import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-headers',
  imports: [RouterLink],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent {

  authService = inject(AuthService)

  logout() {
    this.authService.logout();  
  }

}
