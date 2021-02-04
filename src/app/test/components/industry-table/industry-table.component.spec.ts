import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryTableComponent } from './industry-table.component';

describe('IndustryTableComponent', () => {
  let component: IndustryTableComponent;
  let fixture: ComponentFixture<IndustryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
