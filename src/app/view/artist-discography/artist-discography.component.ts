/*
* WEB422 – Assignment 05 *
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this * assignment has been copied manually or electronically from any other source (including web sites) or * distributed to other students. *
* Name: Tareq Abdi Student ID: 123809196 Date: 28/07/2021 *
*/

import { Component, OnInit } from '@angular/core';
import { MusicDataService } from 'src/app/music-data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  private albumSub: any;
  private artistsSub: any;

  id: any;
  albums: any;
  artists: any;
  datepipe: DatePipe = new DatePipe('en-US');
  constructor(private route: ActivatedRoute, private mds: MusicDataService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.artistsSub = this.mds.getArtistById(this.id).subscribe((data) => {
      this.artists = data;
    });

    this.albumSub = this.mds.getAlbumsByArtistId(this.id).subscribe((data) => {
      this.albums = data.items.filter(
        (v: any, i: any, a: any) =>
          a.findIndex((t: any) => t.name === v.name) === i
      );
    });
  }

  ngOnDestroy() {
    this.albumSub?.unsubscribe();
    this.artistsSub?.unsubscribe();
  }
}
