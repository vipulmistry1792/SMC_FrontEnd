import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplytimeComponent } from './supplytime.component';

describe('SupplytimeComponent', () => {
  let component: SupplytimeComponent;
  let fixture: ComponentFixture<SupplytimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplytimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplytimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
