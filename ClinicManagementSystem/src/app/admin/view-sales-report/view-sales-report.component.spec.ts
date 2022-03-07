import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesReportComponent } from './view-sales-report.component';

describe('ViewSalesReportComponent', () => {
  let component: ViewSalesReportComponent;
  let fixture: ComponentFixture<ViewSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
