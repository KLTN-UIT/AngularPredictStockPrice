import { Action, Select, State, StateContext, Store } from '@ngxs/store';
import { Add, CreateOrReplace, defaultEntityState, EntityState, EntityStateModel, IdStrategy, SetActive } from '@ngxs-labs/entity-state';
import { IndustryModel } from '../../models/IndustryModel';
import { Injectable } from '@angular/core';
import { StockPriceService } from '../../services/StockPrice.service';
import { TestActions } from '../actions';
import { catchError, tap } from 'rxjs/operators';
import { GetIndustryInformation, GetListIndustry, GetSmallChartData, GoToStockDetail } from '../actions/test.actions';
import { Observable } from 'rxjs';

@State<EntityStateModel<IndustryModel>>({
  name: 'Industry',
  defaults: defaultEntityState()
})

@Injectable()
export class IndustryState extends EntityState<IndustryModel> {
  constructor(private stockService: StockPriceService, private store: Store) {
    super(IndustryState, 'industryCode', IdStrategy.EntityIdGenerator);
  }

  @Action(GetListIndustry)
  getListIndustry(state: StateContext<IndustryState>, action: GetListIndustry){
    return this.stockService.getListIndustry().pipe(
      tap((listData: Array<IndustryModel>) => {
        if (!!listData && listData.length > 0){
          this.store.dispatch(new SetActive(IndustryState, listData[0].industryCode));
          this.store.dispatch(new GetSmallChartData(listData[0].industryCode));
          this.store.dispatch(new GetIndustryInformation(listData[0].industryCode));
        }
        return this.store.dispatch(new CreateOrReplace(IndustryState, listData));
      }),
      catchError(err => null)
    );
  }

  @Action(TestActions.AddEntities)
  addEntities(state: StateContext<IndustryState>, action: TestActions.AddEntities){
    return this.store.dispatch(new Add(IndustryState, action.list));
  }

}
