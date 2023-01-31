import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChallengeDetailComponent } from './challenge-detail.component';

describe('ChallengeDetailComponent', () => {
  let component: ChallengeDetailComponent;
  let fixture: ComponentFixture<ChallengeDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
