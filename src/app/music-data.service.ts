import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  public favouriteList: Array<any> = [];

  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { include_groups: 'album,single', limit: '50' },
          }
        );
      })
    );
  }

  getAlbumById(id: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/search`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { q: `${searchString}`, type: 'artist', limit: '50' },
        });
      })
    );
  }

  addToFavourites(id: any): boolean {
    if (id === null || this.favouriteList.length > 50) {
      return false;
    } else {
      this.favouriteList.push(id);
      return true;
    }
  }

  removeFromFavourites(id: any): Observable<any> {
    const index = this.favouriteList.indexOf(id);
    index > -1 ? this.favouriteList.splice(index, 1) : false;
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if (this.favouriteList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap((token) => {
          return this.http.get<any>('https://api.spotify.com/v1/tracks', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ids: `${this.favouriteList.join(',')}` },
          });
        })
      );
    } else {
      return new Observable((o) => {
        o.next([]);
      });
    }
  }
}
