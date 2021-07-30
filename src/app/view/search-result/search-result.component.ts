/*
* WEB422 – Assignment 05 *
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this * assignment has been copied manually or electronically from any other source (including web sites) or * distributed to other students. *
* Name: Tareq Abdi Student ID: 123809196 Date: 28/07/2021 *
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  private resultSub: any;

  results: any;
  searchQuery: any;

  constructor(private route: ActivatedRoute, private mds: MusicDataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];

      this.resultSub = this.mds
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          this.results = data.artists.items.filter((i: any) => {
            return i.images.length > 0;
          });
        });
    });
  }

  ngOnDestroy() {
    this.resultSub?.unsubscribe();
  }
}
