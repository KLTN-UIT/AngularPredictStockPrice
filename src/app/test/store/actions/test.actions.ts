import { IndustryModel } from '../../models/IndustryModel';

export class GetSmallChartData {
  static readonly type = '[TEST] Get data for small chart';

  constructor(public code: string) {
  }
}

export class GetBigChartData {
  static readonly type = '[Big Chart] Get data for big chart';

  constructor(public code: string) {
  }
}

export class GetListIndustry {
  static readonly type = '[TEST] Get list industry';

  constructor() {
  }
}

export class AddEntities {
  static readonly type = '[TEST] Add Entities';

  constructor(public list: IndustryModel[]) {
  }
}

export class GetIndustryInformation {
  static readonly type = '[TEST] Get industry information';

  constructor(public code: string) {
  }
}

export class GoToStockDetail {
  static readonly type = '[TEST] Go to Stock detail';

  constructor(public code: string) {
  }
}

export class SetSearchValue {
  static readonly type = '[TEST] Set search value';

  constructor(public code: string) {
  }
}

export class GetAllEffStock {
  static readonly type = '[EffStock] Get Effect Stock';

  constructor(public code: string) {
  }
}

export class GetNews {
  static readonly type = '[News] Get Stock News';

  constructor() {
  }
}

