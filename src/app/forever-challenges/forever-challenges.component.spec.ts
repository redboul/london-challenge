import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeverChallengesComponent } from './forever-challenges.component';

describe('ForeverChallengesComponent', () => {
  let component: ForeverChallengesComponent;
  let fixture: ComponentFixture<ForeverChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeverChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeverChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
