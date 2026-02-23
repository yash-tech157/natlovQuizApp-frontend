import { ComponentFixture , TestBed } from "@angular/core/testing";
import { QuizAttemptComponent } from "./quiz-attempt.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { vi } from 'vitest';

describe('QuizAttemptComponent', () => {
  let component: QuizAttemptComponent;
  let fixture: ComponentFixture<QuizAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizAttemptComponent, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should decrease timeLeft every second when timer starts', () => {
    vi.useFakeTimers();
    component.timeLeft = 30;
    component.startTimer();

    vi.advanceTimersByTime(1000);
    expect(component.timeLeft).toBe(29);

    vi.advanceTimersByTime(29000);
    expect(component.timeLeft).toBe(0);

    component.clearTimer();
    vi.useRealTimers();
  });

 it('should prevent moving "Next" if no option is selected', () => {
  component.selectedOption = null;
  // Use vi.spyOn instead of spyOn
  const submitSpy = vi.spyOn(component, 'submitQuiz');
  
  component.next();
  
  expect(component.currentStep).toBe(0);
  expect(submitSpy).not.toHaveBeenCalled();
});
});