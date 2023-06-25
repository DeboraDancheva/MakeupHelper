import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleMakeupProductPopupComponent } from './signle-makeup-product-popup.component';

describe('SignleMakeupProductPopupComponent', () => {
  let component: SignleMakeupProductPopupComponent;
  let fixture: ComponentFixture<SignleMakeupProductPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignleMakeupProductPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignleMakeupProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
