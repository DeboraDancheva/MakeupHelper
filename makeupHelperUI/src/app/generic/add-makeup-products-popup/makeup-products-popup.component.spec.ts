import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMakeupProductsPopupComponent } from './makeup-products-popup.component';

describe('MakeupProductsPopupComponent', () => {
  let component: AddMakeupProductsPopupComponent;
  let fixture: ComponentFixture<AddMakeupProductsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMakeupProductsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMakeupProductsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
