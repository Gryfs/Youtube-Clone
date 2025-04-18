import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadersComponent } from "./partials/headers/headers.component";
import { SidebarComponent } from "./partials/sidebar/sidebar.component";
import { HomeComponent } from "./pages/home/home.component";
import { SearchComponent } from './pages/search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadersComponent, SearchComponent, HeadersComponent, SidebarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'YoutubeClone';
}
