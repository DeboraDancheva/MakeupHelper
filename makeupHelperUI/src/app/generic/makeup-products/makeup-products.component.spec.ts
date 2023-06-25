import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupProductsComponent } from './makeup-products.component';

describe('MakeupProductsComponent', () => {
  let component: MakeupProductsComponent;
  let fixture: ComponentFixture<MakeupProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeupProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeupProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
