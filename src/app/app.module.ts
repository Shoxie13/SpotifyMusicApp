import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MusicDataService } from './music-data.service';
import { SpotifyTokenService } from './spotify-token.service';
import { AuthService } from './auth.service';
import { InterceptTokenService } from './intercept-token.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutComponent } from './view/about/about.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { NewReleasesComponent } from './view/new-releases/new-releases.component';
import { ArtistDiscographyComponent } from './view/artist-discography/artist-discography.component';
import { AlbumComponent } from './view/album/album.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchResultComponent } from './view/search-result/search-result.component';
import { FavouritesComponent } from './view/favourites/favourites.component';
import { RegisterComponent } from './view/register/register.component';
import { LoginComponent } from './view/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    NewReleasesComponent,
    AlbumComponent,
    ArtistDiscographyComponent,
    SearchResultComponent,
    FavouritesComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    MusicDataService,
    SpotifyTokenService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
