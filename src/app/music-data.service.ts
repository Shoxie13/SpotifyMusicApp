import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from 'src/environments/environment';

import { mergeMap, subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
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

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(
    searchString: any
  ): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/search`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { q: `${searchString}`, type: 'artist', limit: '50' },
        });
      })
    );
  }

  addToFavourites(id: any): Observable<any> {
    return this.http.put<[any]>(
      `${environment.userAPIBase}/favourites/${id}`,
      {}
    );
  }

  removeFromFavourites(id: any): Observable<any> {
    return this.http
      .delete<any>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          return this.spotifyToken.getBearerToken().pipe(
            mergeMap((token) => {
              if (favouritesArray.data.length > 0) {
                return this.http.get<any>('https://api.spotify.com/v1/tracks', {
                  headers: { Authorization: `Bearer ${token}` },
                  params: { ids: `${favouritesArray.data.join(',')}` },
                });
              } else {
                return new Observable((o) => {
                  o.next({ tracks: [] });
                });
              }
            })
          );
        })
      );
  }

  getFavourites(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}/favourites/`).pipe(
      mergeMap((favouritesArray) => {
        return this.spotifyToken.getBearerToken().pipe(
          mergeMap((token) => {
            if (favouritesArray.data.length > 0) {
              return this.http.get<any>('https://api.spotify.com/v1/tracks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { ids: `${favouritesArray.data.join(',')}` },
              });
            } else {
              return new Observable((o) => {
                o.next({ tracks: [] });
              });
            }
          })
        );
      })
    );
  }
}
