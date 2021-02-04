import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { StocknewStates } from '../../store/states/stocknew.states';
import { Observable } from 'rxjs';
import { StockNewModel } from '../../models/StockNewModel';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  @Select(StocknewStates.entities) listStockNews$: Observable<StockNewModel[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
