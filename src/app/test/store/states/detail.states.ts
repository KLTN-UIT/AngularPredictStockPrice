import { CreateOrReplace, defaultEntityState, EntityState, EntityStateModel, IdStrategy, RemoveAll } from '@ngxs-labs/entity-state';
import { StockPriceModel } from '../../models/StockPriceModel';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { BigchartStatesModel } from './bigchart.states';
import { Injectable } from '@angular/core';
import { StockEffModel } from '../../models/StockEffModel';
import { GetAllEffStock, GetSmallChartData } from '../actions/test.actions';
import { catchError, tap } from 'rxjs/operators';
import { StockPriceService } from '../../services/StockPrice.service';

export interface DetailStatesModel extends EntityStateModel<StockEffModel>{
  isLoading: boolean;
}

@State<DetailStatesModel>({
  name: 'detail',
  defaults: {
    ...defaultEntityState(),
    isLoading: false
  }
})

@Injectable()
export class DetailStates extends EntityState<StockEffModel> {
  constructor(private stockService: StockPriceService, private store: Store) {
    super(DetailStates, 'id', IdStrategy.EntityIdGenerator);
  }

  @Action(GetAllEffStock)
  getBigChartData(state: StateContext<DetailStates>, action: GetAllEffStock){
    return this.stockService.getEffStock(action.code).pipe(
      tap((result: any) => {
        if (!!result && result.data.length > 0){
          const list: StockEffModel[] = result.data;
          for (let i = 0; i < result.data.length; i++) {
            list[i].id = i;
          }
          this.store.dispatch(new RemoveAll(DetailStates));
          return this.store.dispatch(new CreateOrReplace(DetailStates, list));
        }
        return this.store.dispatch(new RemoveAll(DetailStates));
      }),
      catchError(err => null)
    );
  }
}
