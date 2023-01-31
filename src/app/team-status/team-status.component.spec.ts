import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamStatusComponent } from './team-status.component';

describe('TeamStatusComponent', () => {
  let component: TeamStatusComponent;
  let fixture: ComponentFixture<TeamStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
