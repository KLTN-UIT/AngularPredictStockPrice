import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Add, CreateOrReplace, defaultEntityState, EntityState, EntityStateModel, IdStrategy, RemoveAll } from '@ngxs-labs/entity-state';
import { StockPriceModel } from '../../models/StockPriceModel';
import { StockPriceService } from '../../services/StockPrice.service';
import { catchError, tap } from 'rxjs/operators';
import { GetBigChartData, GetSmallChartData } from '../actions/test.actions';

@State<EntityStateModel<StockPriceModel>>({
  name: 'Stock',
  defaults: defaultEntityState()
})

@Injectable()
export class PriceState extends EntityState<StockPriceModel> {
  constructor(private stockService: StockPriceService, private store: Store) {
    super(PriceState, 'id', IdStrategy.EntityIdGenerator);
  }

  @Action(GetSmallChartData)
  getSmallChartData(state: StateContext<PriceState>, action: GetSmallChartData){
    return this.stockService.getListIndustryStockPriceForSmallChart(action.code).pipe(
      tap((listData: any) => {
        if (!!listData && listData.dataViewMiniChartIndustryModels.length > 0){
          const list: StockPriceModel[] = listData.dataViewMiniChartIndustryModels;
          for (let i = 0; i < listData.dataViewMiniChartIndustryModels.length; i++) {
            list[i].id = i;
          }
          this.store.dispatch(new RemoveAll(PriceState));
          return this.store.dispatch(new CreateOrReplace(PriceState, list));
        }
        return this.store.dispatch(new RemoveAll(PriceState));
      }),
      catchError(err => null)
    );
  }

  // @Action(GetBigChartData)
  // getBigChartData(state: StateContext<PriceState>, action: GetBigChartData){
  //   return this.stockService.getFullPredictDataForBigChart(action.code).pipe(
  //     tap((listData: any) => {
  //       if (!!listData && listData.dataViewMiniChartIndustryModels.length > 0){
  //         const list: StockPriceModel[] = listData.dataViewMiniChartIndustryModels;
  //         for (let i = 0; i < listData.dataViewMiniChartIndustryModels.length; i++) {
  //           list[i].id = i;
  //         }
  //         this.store.dispatch(new RemoveAll(PriceState));
  //         return this.store.dispatch(new CreateOrReplace(PriceState, list));
  //       }
  //       return this.store.dispatch(new RemoveAll(PriceState));
  //     }),
  //     catchError(err => null)
  //   );
  // }
}

