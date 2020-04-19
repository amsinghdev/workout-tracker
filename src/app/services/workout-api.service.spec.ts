import { TestBed } from '@angular/core/testing';

import { WorkoutApiService } from './workout-api.service';

describe('WorkoutApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutApiService = TestBed.get(WorkoutApiService);
    expect(service).toBeTruthy();
  });
});
