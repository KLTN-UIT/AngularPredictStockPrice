import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndustryModel } from '../models/IndustryModel';
import { StockPriceModel } from '../models/StockPriceModel';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IndustryInformationModel } from '../models/IndustryInformationModel';

@Injectable()
export class StockPriceService {
  constructor(private httpClient: HttpClient) {
  }

  getListIndustry(): Observable<Array<IndustryModel>> {
    return this.httpClient.get<Array<IndustryModel>>(`${environment.apiUrl}/industries`);
  }

  getListIndustryStockPriceForSmallChart(code: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/data/GetByIndustryCode/${code}`);
  }

  getIndustryInformation(code: string): Observable<IndustryInformationModel> {
    return this.httpClient.get<IndustryInformationModel>(`${environment.apiUrl}/industries/GetByIndustryCode/${code}`);
  }

  getFullPredictDataForBigChart(code: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/data/GetBigData/${code}`);
  }

  getEffStock(code: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/data/GetAllEffStock/${code}`);
  }

  getStockNews(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/StockNew/get-news`);
  }
}
