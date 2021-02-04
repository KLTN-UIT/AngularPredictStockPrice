import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NbSearchService } from '@nebular/theme';
import {
  AddEntities,
  GetAllEffStock,
  GetIndustryInformation,
  GetListIndustry, GetNews,
  SetSearchValue
} from '../../store/actions/test.actions';
import { IndustryState } from '../../store/states/Industry.state';
import { Observable, Subscription, timer } from 'rxjs';
import { IndustryModel } from '../../models/IndustryModel';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { StocknewStates } from '../../store/states/stocknew.states';
import { StockNewModel } from '../../models/StockNewModel';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  searchValue: string;
  @Select(IndustryState.entities) listIndustries$: Observable<IndustryModel[]>;
  subsciption$: Subscription;
  time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );

  constructor(private store: Store, private searchService: NbSearchService, private router: Router) {
    this.store.dispatch(new GetListIndustry());
    this.store.dispatch(new GetNews());
    this.subsciption$ = this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchValue = data.term;
        const temp = this.searchValue;
        if (this.searchValue[0] !== '^') {
          this.searchValue = '^' + this.searchValue;
        }
        this.listIndustries$.subscribe(value => {
          console.log(value);
          if (value.findIndex(x => x.industryCode === this.searchValue) !== -1) {
            this.store.dispatch(new SetSearchValue(temp));
            this.router.navigate([`detail/${temp.replace('^', '')}`]);
          } else {
            console.log('khong ton tai');
          }
        }).unsubscribe();
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subsciption$.unsubscribe();
  }
  get time() {
    return this.time$;
  }

}
