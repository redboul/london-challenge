import { Injectable } from '@angular/core';

const status = {
  default: 'available',
  available: 'available',
  working: 'working'
};

@Injectable()
export class AppStatusService {

  status = status.working;
  constructor() { }
  isWorking() {
    return this.status === status.working;
  }
  isReady() {
    return this.status === status.available;
  }
  workInProgress() {
    this.status = status.working;
  }
  available() {
    this.status = status.available;
  }
}
