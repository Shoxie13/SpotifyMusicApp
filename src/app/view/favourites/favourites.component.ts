/*
* WEB422 – Assignment 05 *
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this * assignment has been copied manually or electronically from any other source (including web sites) or * distributed to other students. *
* Name: Tareq Abdi Student ID: 123809196 Date: 28/07/2021 *
*/

import { Component, OnInit } from '@angular/core';
import { MusicDataService } from 'src/app/music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  private favSub: any;
  favourites: Array<any> = [];

  constructor(private mds: MusicDataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.favSub = this.mds.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: any) {
    this.favSub = this.mds.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
      this.snackBar.open('Removed from Favourites...', 'Done', {
        duration: 1500,
      });
    });
  }

  ngOnDestroy() {
    this.favSub.unsubscribe();
  }
}
