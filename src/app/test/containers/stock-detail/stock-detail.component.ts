import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Select, Store } from '@ngxs/store';
import { Observable, timer } from 'rxjs';
import { StockPriceModel } from '../../models/StockPriceModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AnotherState } from '../../store/states/another.state';
import { GetAllEffStock, GetBigChartData } from '../../store/actions/test.actions';
import { BigchartStates } from '../../store/states/bigchart.states';
import { DetailStates } from '../../store/states/detail.states';
import { StockEffModel } from '../../models/StockEffModel';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  @Select(BigchartStates.entities) dataPrice$: Observable<StockPriceModel[]>;
  @Select(DetailStates.entities) stocksEff$: Observable<StockEffModel[]>;
  @Select(AnotherState.searchValue) search$: Observable<string>;
  time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );

  displayedColumns: string[] = ['position',
    'stockCode',
    'referencePrice',
    'aTO',
    'rateOfInfluence', 'isIncrease', 'percentageChange', 'updatedAt'];
  nowValue = '';
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'No Name' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {},
  };
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  code: '';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router){
    this.dataPrice$.subscribe(value => {
      if (!!value && value.length > 0) {
        const dataSets = [
          { data: [], label: 'No Name' },
        ];
        const dataTime: Label[] = [];
        value.forEach(vl => {
          dataSets[0].data.push(vl.price);
          dataSets[0].label = vl.name;
          dataTime.push(this.parse(vl.dateTime));
        });
        this.nowValue = value[30].dateTime;
        this.lineChartData = dataSets;
        this.lineChartLabels = dataTime;
        this.lineChartOptions = {
          ...this.lineChartOptions,
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: this.parse(this.nowValue),
                borderColor: 'orange',
                borderWidth: 2,
                label: {
                  enabled: true,
                  fontColor: 'orange',
                  content: 'Now'
                }
              },
            ],
          },
        };
      }
    });

    this.route.paramMap.subscribe(params => {
        const code = params.get('code');
        this.store.dispatch(new GetBigChartData('^' + code));
        this.store.dispatch(new GetAllEffStock('^' + code));
    });
  }

  ngOnInit(): void {
    // this.search$.subscribe(value => {
    //   if (!!value){
    //     this.store.dispatch(new GetBigChartData('^' + value));
    //     this.store.dispatch(new GetAllEffStock('^' + value));
    //   }
    // });
  }

  parse(date: string): string {
    const list = Array<string>();
    list.push(date.slice(0, 4));
    list.push(date.slice(4, 6));
    list.push(date.slice(6, 8));
    return list.join('/');
  }

  get time() {
    return this.time$;
  }
  backToMainPage(){
    this.router.navigate(['']);
  }

}
