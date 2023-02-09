import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDatainsertComponent } from './reports-datainsert.component';

describe('ReportsDatainsertComponent', () => {
  let component: ReportsDatainsertComponent;
  let fixture: ComponentFixture<ReportsDatainsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsDatainsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDatainsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
