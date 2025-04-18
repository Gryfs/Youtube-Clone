import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isLoggedIn = false;
  showInput = false;
  newPlaylistName = '';
  playlists: Playlist[] = [];
  allPlaylists: Playlist[] = [];


  authService = inject(AuthService)

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user

    if (user) {
      const stored = localStorage.getItem('playlists');
      this.allPlaylists = stored ? JSON.parse(stored) : [];
      this.playlists = this.allPlaylists.filter(p => p.userId === user.id);
    }

  }

  toggleInput(): void {
    this.showInput = !this.showInput;  
  }


  createPlaylist(): void {
    const name = this.newPlaylistName.trim();
    const user = this.authService.getCurrentUser();

    if (name) {
      const newPlaylist: Playlist = { name, videos: [], userId: user.id };
      this.allPlaylists.push(newPlaylist);
      localStorage.setItem('playlists', JSON.stringify(this.allPlaylists));

      this.playlists = this.allPlaylists.filter(p => p.userId === user.id);
      this.newPlaylistName = '';
      this.showInput = false;
    }
  }
}
