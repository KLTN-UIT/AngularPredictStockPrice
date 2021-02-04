import { CreateOrReplace, defaultEntityState, EntityState, EntityStateModel, IdStrategy, RemoveAll } from '@ngxs-labs/entity-state';
import { StockNewModel } from '../../models/StockNewModel';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { StockPriceService } from '../../services/StockPrice.service';
import { GetNews } from '../actions/test.actions';
import { catchError, tap } from 'rxjs/operators';
import { StockEffModel } from '../../models/StockEffModel';

export interface StockNewStateModel extends EntityStateModel<StockNewModel>{
  isLoading: boolean;
}

@State<StockNewStateModel>({
  name: 'stocknew',
  defaults: {
    ...defaultEntityState(),
    isLoading: false
  }
})

@Injectable()
export class StocknewStates extends EntityState<StockNewModel> {
  constructor(private stockService: StockPriceService, private store: Store) {
    super(StocknewStates, 'id', IdStrategy.EntityIdGenerator);
  }

  @Action(GetNews)
  getNews(state: StateContext<StocknewStates>, action: GetNews){
    return this.stockService.getStockNews().pipe(
      tap((result: StockNewModel[]) => {
        if (!!result && result.length > 0){
          const list: StockNewModel[] = result;
          this.store.dispatch(new RemoveAll(StocknewStates));
          return this.store.dispatch(new CreateOrReplace(StocknewStates, list));
        }
        return this.store.dispatch(new RemoveAll(StocknewStates));
      }),
      catchError(err => null)
    );
  }
}
