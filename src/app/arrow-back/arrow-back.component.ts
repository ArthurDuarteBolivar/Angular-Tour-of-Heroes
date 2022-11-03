import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
@Component({
  selector: 'arrow-back',
  templateUrl: './arrow-back.component.html',
  styleUrls: ['./arrow-back.component.scss']
})
export class ArrowBackComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
