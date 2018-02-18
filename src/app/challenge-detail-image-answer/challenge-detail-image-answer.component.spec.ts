import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailImageAnswerComponent } from './challenge-detail-image-answer.component';

describe('ChallengeDetailImageAnswerComponent', () => {
  let component: ChallengeDetailImageAnswerComponent;
  let fixture: ComponentFixture<ChallengeDetailImageAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDetailImageAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDetailImageAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
