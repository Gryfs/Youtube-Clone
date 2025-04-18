import { Component, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { Playlist } from '../../models/playlist';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchQuery: string = '';
  videos: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  playlists: Playlist[] = [];
  selectedVideoId: string | null = null;
  allPlaylists: Playlist[] = []
  selectedPlaylistName: string = '';


  private youtubeService = inject(YoutubeService);
  private authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    const stored = localStorage.getItem('playlists');
    const allPlaylists: Playlist[] = stored ? JSON.parse(stored) : [];

    if (user) {
      this.playlists = allPlaylists.filter(p => p.userId === user.id);
    }
  }

  onSearch() {
    if (!this.searchQuery.trim()) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.videos = [];
    this.youtubeService.searchVideos(this.searchQuery).subscribe({
      next: (response) => {
        this.videos = response.items;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la recherche.";
        console.error(err);
        this.isLoading = false;
      }
    });


  }

  onAddClick(videoId: string) {
    this.selectedVideoId = videoId;
  }

  onPlaylistSelect(playlistName: string, video: any) {
    console.log("test")
    console.log("Nom de la playlist :", playlistName);
    console.log("Vidéo :", video);

    //on verifie que le nom de la playlsit est bon
    const playlist = this.playlists.find(p => p.name === playlistName);
    if (!playlist) return;



    //On recupere le titre de la video et l'id
    const title = video.snippet?.title;
    const videoId = video.id?.videoId;
    if (!title || !videoId) return;

    //on regarde si la video est déjà présente dans la playlist
    const alreadyExists = playlist.videos.some(v => v.url === `https://www.youtube.com/watch?v=${videoId}`);
    if (alreadyExists) {
      alert('Cette vidéo est déjà dans la playlist.');
      return;
    }

    //on crée l'objet symplifié video pour le mettre dans la playlist
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const simplifiedVideo = {
      title,
      url: videoUrl
    };

    //on rajoute dans la playlist
    playlist.videos.push(simplifiedVideo);


    //on recupere les playlist du local storage
    const stored = localStorage.getItem('playlists');
    const allPlaylists: Playlist[] = stored ? JSON.parse(stored) : [];

    //on met à jour la playlist correspondante
    const updatedPlaylists = allPlaylists.map(p =>
      p.userId === playlist.userId && p.name === playlist.name ? playlist : p
    );

    //puis on sauvegarde
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));

    //TEST
    alert(`Vidéo ajoutée à la playlist "${playlistName}"`);
    this.selectedVideoId = null;
  }
}