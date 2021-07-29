/*
* WEB422 – Assignment 05 *
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this * assignment has been copied manually or electronically from any other source (including web sites) or * distributed to other students. *
* Name: Tareq Abdi Student ID: 123809196 Date: 28/07/2021 *
*/

import { Component, OnInit } from '@angular/core';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releases: any = [];
  private releasesSub: any;

  constructor(private mds: MusicDataService) {}

  ngOnInit(): void {
    this.releasesSub = this.mds.getNewReleases().subscribe((data) => {
      this.releases = data.albums.items;
    });
  }

  ngOnDestroy() {
    this.releasesSub?.unsubscribe();
  }
}
