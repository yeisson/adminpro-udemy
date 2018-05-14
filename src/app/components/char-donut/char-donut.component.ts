import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-char-donut',
  templateUrl: './char-donut.component.html',
  styles: []
})
export class CharDonutComponent implements OnInit {

  // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: number[] = [350, 450, 100];
  // public doughnutChartType = 'doughnut';

  @Input() ChartLabels: string[] = [];
  @Input() ChartData: number[] = [];
  @Input() ChartType = '';


  constructor() { }

  ngOnInit() {
  }

}
