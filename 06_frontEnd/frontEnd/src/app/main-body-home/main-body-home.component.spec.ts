import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBodyHomeComponent } from './main-body-home.component';

describe('MainBodyHomeComponent', () => {
  let component: MainBodyHomeComponent;
  let fixture: ComponentFixture<MainBodyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBodyHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainBodyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
