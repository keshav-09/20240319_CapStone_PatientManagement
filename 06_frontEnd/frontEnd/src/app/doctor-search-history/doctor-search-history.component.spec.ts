import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchHistoryComponent } from './doctor-search-history.component';

describe('DoctorSearchHistoryComponent', () => {
  let component: DoctorSearchHistoryComponent;
  let fixture: ComponentFixture<DoctorSearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSearchHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
