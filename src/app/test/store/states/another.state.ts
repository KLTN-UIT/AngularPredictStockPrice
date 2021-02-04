import { Action, actionMatcher, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IndustryModel } from '../../models/IndustryModel';
import { GetIndustryInformation, GetListIndustry, SetSearchValue } from '../actions/test.actions';
import { catchError, tap } from 'rxjs/operators';
import { StockPriceService } from '../../services/StockPrice.service';
import { IndustryInformationModel } from '../../models/IndustryInformationModel';

export class AnotherStateModel {
  isLoading: boolean;
  error: string;
  industryInformation: IndustryInformationModel;
  search: string;
}

@State<AnotherStateModel>({
  name: 'another',
  defaults: {
    error: null,
    isLoading: null,
    industryInformation: null,
    search: null
  }
})

@Injectable()
export class AnotherState {
  constructor(private stockPriceService: StockPriceService) {
  }

  @Selector()
  static searchValue(state: AnotherStateModel) {
    return state.search;
  }

  @Selector()
  static selectedIndustry(state: AnotherStateModel) {
    return state.industryInformation;
  }

  @Action(GetIndustryInformation)
  getIndustryInformation(state: StateContext<AnotherStateModel>, action: GetIndustryInformation) {
    return this.stockPriceService.getIndustryInformation(action.code).pipe(
      tap((data: IndustryInformationModel) => {
        const nowState = state.getState();
        state.setState({ ...nowState, industryInformation: data });
      }),
      catchError(err => null)
    );
  }

  @Action(SetSearchValue)
  setSearchValue(state: StateContext<AnotherStateModel>, action: SetSearchValue) {
    const current = state.getState();
    state.setState({
      ...current,
      search: action.code
    });
  }
}
