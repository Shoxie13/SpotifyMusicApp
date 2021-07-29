import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './view/about/about.component';
import { AlbumComponent } from './view/album/album.component';
import { ArtistDiscographyComponent } from './view/artist-discography/artist-discography.component';
import { NewReleasesComponent } from './view/new-releases/new-releases.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { SearchResultComponent } from './view/search-result/search-result.component';
import { FavouritesComponent } from './view/favourites/favourites.component';

const routes: Routes = [
  { path: 'favourites', component: FavouritesComponent },
  { path: 'newReleases', component: NewReleasesComponent },
  { path: '', redirectTo: 'newReleases', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'artist/:id', component: ArtistDiscographyComponent },
  { path: 'search', component: SearchResultComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
