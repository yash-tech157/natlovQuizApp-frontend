import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Results } from './results';
import { QuizService } from '../../../services/quiz';
import { LeaderboardWebSocketService } from '../../../services/leaderboard-websocket.service';

describe('Results', () => {
  let component: Results;
  let fixture: ComponentFixture<Results>;

  const mockQuizService = {
    getLeaderboard: () => of([]),
    getResultById: (id: number) => of({})
  } as Partial<QuizService>;

  const mockWsService = {
    connect: () => {},
    disconnect: () => {},
    leaderboard$: of([])
  } as Partial<LeaderboardWebSocketService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Results],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (_: string) => null } } } },
        { provide: QuizService, useValue: mockQuizService },
        { provide: LeaderboardWebSocketService, useValue: mockWsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Results);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
