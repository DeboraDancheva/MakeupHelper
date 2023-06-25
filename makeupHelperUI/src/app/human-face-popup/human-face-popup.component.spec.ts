import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanFacePopupComponent } from './human-face-popup.component';

describe('HumanFacePopupComponent', () => {
  let component: HumanFacePopupComponent;
  let fixture: ComponentFixture<HumanFacePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanFacePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanFacePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
