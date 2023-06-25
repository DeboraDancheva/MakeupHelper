import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPopupComponent } from './add-media-popup.component';

describe('MediaPopupComponent', () => {
  let component: MediaPopupComponent;
  let fixture: ComponentFixture<MediaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
