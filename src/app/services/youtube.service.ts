import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'AIzaSyCharclD44j_Kr9GwMjY2pAPc_f0nGkzf0'; // Remplace par ta clé API YouTube
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search'; // URL de l'API YouTube

  private readonly http: HttpClient = inject(HttpClient);

  searchVideos(query: string, maxResults: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')              // Paramètre 'part' pour récupérer la partie des métadonnées de la vidéo
      .set('q', query)                     // Paramètre 'q' pour la requête de recherche (termes de recherche)
      .set('maxResults', maxResults.toString())  // Paramètre 'maxResults' pour limiter le nombre de résultats
      .set('key', this.apiKey);            // La clé API que tu utilises pour l'accès à l'API YouTube
  
    // Envoi d'une requête HTTP GET à l'API YouTube avec les paramètres définis
    return this.http.get<any>(this.apiUrl, { params });
  }
  
}


