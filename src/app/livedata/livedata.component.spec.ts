import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivedataComponent } from './livedata.component';

describe('LivedataComponent', () => {
  let component: LivedataComponent;
  let fixture: ComponentFixture<LivedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
