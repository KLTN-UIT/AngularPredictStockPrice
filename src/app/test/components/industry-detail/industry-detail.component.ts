import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AnotherState } from '../../store/states/another.state';
import { IndustryInformationModel } from '../../models/IndustryInformationModel';

@Component({
  selector: 'app-industry-detail',
  templateUrl: './industry-detail.component.html',
  styleUrls: ['./industry-detail.component.css']
})
export class IndustryDetailComponent implements OnInit {
  @Select(AnotherState.selectedIndustry) selectedIndustry$: Observable<IndustryInformationModel>;

  constructor() {
  }
  ngOnInit(): void {
  }
}
