import { CreateOrReplace, defaultEntityState, EntityState, EntityStateModel, IdStrategy, RemoveAll } from '@ngxs-labs/entity-state';
import { StockPriceModel } from '../../models/StockPriceModel';
import { Injectable } from '@angular/core';
import { GetAllEffStock, GetBigChartData } from '../actions/test.actions';
import { StockPriceService } from '../../services/StockPrice.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

export interface BigchartStatesModel extends EntityStateModel<StockPriceModel>{
  isLoading: boolean;
}

@State<BigchartStatesModel>({
  name: 'bigchart',
  defaults: {
    ...defaultEntityState(),
    isLoading: false
  }
})

@Injectable()
export class BigchartStates extends EntityState<StockPriceModel> {
  constructor(private stockService: StockPriceService, private store: Store) {
    super(BigchartStates, 'id', IdStrategy.EntityIdGenerator);
  }

  @Action(GetBigChartData)
  getAllEffStock(state: StateContext<BigchartStates>, action: GetBigChartData){
    return this.stockService.getFullPredictDataForBigChart(action.code).pipe(
      tap( (re: any) => {
        if (!!re.data && re.data.length > 0){
          const list: StockPriceModel[] = re.data;
          for (let i = 0; i < re.data.length; i++) {
            list[i].id = i;
          }
          this.store.dispatch(new RemoveAll(BigchartStates));
          return this.store.dispatch(new CreateOrReplace(BigchartStates, list));
        }
        return this.store.dispatch(new RemoveAll(BigchartStates));
        }),
      catchError(err => null)
    );
  }
}


