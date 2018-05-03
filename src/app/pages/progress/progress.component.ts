import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  progreso: number = 50;

  constructor() { }

  ngOnInit() {
  }


}
