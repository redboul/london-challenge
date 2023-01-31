import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChallengeDescriptionComponent } from './challenge-description.component';

describe('ChallengeDescriptionComponent', () => {
  let component: ChallengeDescriptionComponent;
  let fixture: ComponentFixture<ChallengeDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
