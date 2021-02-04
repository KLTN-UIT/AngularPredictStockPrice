import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { NgxsModule } from '@ngxs/store';
import { PriceState } from './store/states/test.states';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbSearchModule,
  NbSearchService,
  NbTabsetModule
} from '@nebular/theme';
import { SmallChartComponent } from './components/small-chart/small-chart.component';
import { ChartsModule } from 'ng2-charts';
import { AnotherState } from './store/states/another.state';
import { IndustryDetailComponent } from './components/industry-detail/industry-detail.component';
import { IndustryTableComponent } from './components/industry-table/industry-table.component';
import { MatTableModule } from '@angular/material/table';
import { NewsListComponent } from './components/news-list/news-list.component';
import { IndustryState } from './store/states/Industry.state';
import { StockPriceService } from './services/StockPrice.service';
import { StockDetailComponent } from './containers/stock-detail/stock-detail.component';
import { BigchartStates } from './store/states/bigchart.states';
import { DetailStates } from './store/states/detail.states';
import { StocknewStates } from './store/states/stocknew.states';

@NgModule({
  declarations: [MainPageComponent,
    SmallChartComponent,
    IndustryDetailComponent, IndustryTableComponent, NewsListComponent, StockDetailComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    NgxsModule.forFeature([PriceState, AnotherState, IndustryState, BigchartStates, DetailStates, StocknewStates]),
    FormsModule,
    NbLayoutModule,
    ChartsModule,
    NbCardModule,
    NbSearchModule,
    MatTableModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbTabsetModule
  ],
  providers: [NbSearchService, StockPriceService]
})
export class TestModule {
}
