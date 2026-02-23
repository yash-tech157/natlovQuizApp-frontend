import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { QuizListComponent } from './quiz-list.component';
import { QuizService } from '../../../services/quiz';
import { By } from '@angular/platform-browser';

describe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;

  // Mocking the backend response
  const mockQuizService = {
    getQuizzes: vi.fn().mockReturnValue(of([
      { id: 1, title: 'Core Java', description: 'Test your Java skills', questionsCount: 10 },
      { id: 2, title: 'Angular Basics', description: 'Test your Angular skills', questionsCount: 5 }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizListComponent],
      providers: [
        provideRouter([]),
        { provide: QuizService, useValue: mockQuizService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should render a list of quizzes in the grid', () => {
    // Find all elements with the class 'quiz-card'
    const quizCards = fixture.debugElement.queryAll(By.css('.quiz-card'));
    
    expect(quizCards.length).toBe(2);
    
    // Check if the title rendered correctly
    const firstQuizTitle = quizCards[0].query(By.css('mat-card-title')).nativeElement.textContent;
    expect(firstQuizTitle).toContain('Core Java');
  });
});