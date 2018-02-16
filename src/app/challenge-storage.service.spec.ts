import { TestBed, inject } from '@angular/core/testing';

import { ChallengeStorageService } from './challenge-storage.service';

describe('ChallengeStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeStorageService]
    });
  });

  it('should be created', inject([ChallengeStorageService], (service: ChallengeStorageService) => {
    expect(service).toBeTruthy();
  }));
});
