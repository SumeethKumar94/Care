import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicineStockReportComponent } from './view-medicine-stock-report.component';

describe('ViewMedicineStockReportComponent', () => {
  let component: ViewMedicineStockReportComponent;
  let fixture: ComponentFixture<ViewMedicineStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedicineStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicineStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
