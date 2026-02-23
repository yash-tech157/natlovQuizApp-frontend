import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { QuizService } from '../../../services/quiz';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  // Mocking the backend calls
  const mockQuizService = {
    getQuizzes: vi.fn().mockReturnValue(of([{ id: 1, title: 'Java Test', questionsCount: 5 }])),
    getPlayerCount: vi.fn().mockReturnValue(of(42)),
    deleteQuiz: vi.fn().mockReturnValue(of({}))
  };

  const mockDialog = {
    open: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: QuizService, useValue: mockQuizService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // This triggers ngOnInit
  });

  it('should load quizzes and player count on init', () => {
    expect(mockQuizService.getQuizzes).toHaveBeenCalled();
    expect(mockQuizService.getPlayerCount).toHaveBeenCalled();
    expect(component.quizzes.length).toBe(1);
    expect(component.playerCount).toBe(42);
    expect(component.quizzes[0].title).toBe('Java Test');
  });

  it('should call deleteQuiz on service when delete is confirmed', () => {
    // Mock the window.confirm dialog to return true
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    
    component.deleteQuiz(1);
    expect(mockQuizService.deleteQuiz).toHaveBeenCalledWith(1);
  });
});