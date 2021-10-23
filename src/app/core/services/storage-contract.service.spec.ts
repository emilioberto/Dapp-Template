import { TestBed } from '@angular/core/testing';

import { StorageContractService } from './storage-contract.service';

describe('StorageContractService', () => {
  let service: StorageContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
