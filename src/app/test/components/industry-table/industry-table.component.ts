import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IndustryState } from '../../store/states/Industry.state';
import { IndustryModel } from '../../models/IndustryModel';
import { SetActive } from '@ngxs-labs/entity-state';
import { GetIndustryInformation, GetSmallChartData } from '../../store/actions/test.actions';

@Component({
  selector: 'app-industry-table',
  templateUrl: './industry-table.component.html',
  styleUrls: ['./industry-table.component.css']
})
export class IndustryTableComponent implements OnInit {
  displayedColumns: string[] = ['industryCode',
    'openPrice',
    'closePrice',
    'closePredict1Day',
    'closePredict3Day', 'closePredict7Day', 'volume', 'lastUpdatedDate'];

  @Select(IndustryState.entities) listIndustries$: Observable<IndustryModel[]>;
  @Select(IndustryState.entities) selectedIndustry$: Observable<IndustryModel>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  onClickIndustryTable(data: IndustryModel) {
    this.store.dispatch(new SetActive(IndustryState, data.industryCode));
    this.store.dispatch(new GetSmallChartData(data.industryCode));
    this.store.dispatch(new GetIndustryInformation(data.industryCode));
  }

  parse(date: string): string {
    const list = Array<string>();
    list.push(date.slice(0, 4));
    list.push(date.slice(4, 6));
    list.push(date.slice(6, 8));
    return list.join('/');
  }

}
