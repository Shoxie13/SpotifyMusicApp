/*
* WEB422 – Assignment 05 *
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this * assignment has been copied manually or electronically from any other source (including web sites) or * distributed to other students. *
* Name: Tareq Abdi Student ID: 123809196 Date: 28/07/2021 *
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  private albumSub: any;

  id: any;
  album: any;
  datepipe: DatePipe = new DatePipe('en-US');
  constructor(
    private route: ActivatedRoute,
    private mds: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.albumSub = this.mds.getAlbumById(this.id).subscribe((data) => {
      this.album = data;
    });
  }

  addToFavourites(track: any) {
    if (this.mds.addToFavourites(track)) {
      this.snackBar.open('Adding to Favourites...', 'Done', { duration: 1500 });
    }
  }

  ngOnDestroy() {
    this.albumSub?.unsubscribe();
  }
}
