import { TestBed } from '@angular/core/testing';

import { UserFaceConfigDataServiceService } from './user-face-config-data-service.service';

describe('UserFaceConfigDataServiceService', () => {
  let service: UserFaceConfigDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFaceConfigDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
