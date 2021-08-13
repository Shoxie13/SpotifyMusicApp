import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardAuthService } from './guard-auth.service';

import { AboutComponent } from './view/about/about.component';
import { AlbumComponent } from './view/album/album.component';
import { ArtistDiscographyComponent } from './view/artist-discography/artist-discography.component';
import { NewReleasesComponent } from './view/new-releases/new-releases.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { SearchResultComponent } from './view/search-result/search-result.component';
import { FavouritesComponent } from './view/favourites/favourites.component';
import { RegisterComponent } from './view/register/register.component';
import { LoginComponent } from './view/login/login.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchResultComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'newReleases',
    component: NewReleasesComponent,
    canActivate: [GuardAuthService],
  },
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'artist/:id',
    component: ArtistDiscographyComponent,
    canActivate: [GuardAuthService],
  },
  { path: '', redirectTo: 'newReleases', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
