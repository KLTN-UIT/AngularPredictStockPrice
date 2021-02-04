import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Select } from '@ngxs/store';
import { PriceState } from '../../store/states/test.states';
import { Observable } from 'rxjs';
import { StockPriceModel } from '../../models/StockPriceModel';

@Component({
  selector: 'app-small-chart',
  templateUrl: './small-chart.component.html',
  styleUrls: ['./small-chart.component.css']
})
export class SmallChartComponent implements OnInit {
  @Select(PriceState.entities) dataPrice$: Observable<StockPriceModel[]>;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'No Name' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
    this.dataPrice$.subscribe(value => {
      if (!!value && value.length > 0) {
        const dataSets: ChartDataSets[] = [
          { data: [], label: 'No Name' },
        ];
        const dataTime: Label[] = [];
        value.forEach(vl => {
          dataSets[0].data.push(vl.price);
          dataSets[0].label = vl.name;
          dataTime.push(this.parse(vl.dateTime));
        });
        this.lineChartData = dataSets;
        this.lineChartLabels = dataTime;
      }
    });
  }

  ngOnInit(): void {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  parse(date: string): string {
    const list = Array<string>();
    list.push(date.slice(0, 4));
    list.push(date.slice(4, 6));
    list.push(date.slice(6, 8));
    return list.join('/');
  }

}
