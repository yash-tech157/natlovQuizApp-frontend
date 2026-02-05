import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { QuizService } from '../../../services/quiz';
import { Question } from '../../../services/quiz';

@Component({
  selector: 'app-quiz-attempt',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  templateUrl: './quiz-attempt.component.html',
  styleUrl: './quiz-attempt.component.scss'
})
export class QuizAttemptComponent implements OnInit {

  quizId!: number;

  questions: Question[] = [];

  currentStep = 0;
  selectedOption: string | null = null;

  // ✅ store answers by index
  userAnswers: string[] = [];

  isFinished = false;
  totalScore = 0;
  isLoading = true;

  timePerQuestion = 30; // seconds
timeLeft = this.timePerQuestion;
timerInterval: any;


  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.quizId = Number(idParam);
      this.loadQuestions();
    }
  }

  loadQuestions(): void {
    this.quizService.getQuestionsByQuiz(this.quizId).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        this.isLoading = false;
        this.startTimer();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading questions', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
startTimer(): void {
  this.clearTimer();
  this.timeLeft = this.timePerQuestion;

  this.timerInterval = setInterval(() => {
    this.timeLeft--;

    // 🔥 FORCE UI UPDATE
    this.cdr.detectChanges();

    if (this.timeLeft === 0) {
      this.onTimeUp();
    }
  }, 1000);
}


clearTimer(): void {
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
}

onTimeUp(): void {
  // save current answer or empty
  this.userAnswers[this.currentStep] = this.selectedOption || '';

  if (this.currentStep < this.questions.length - 1) {
    this.currentStep++;
    this.selectedOption = this.userAnswers[this.currentStep] || null;
    this.startTimer();
  } else {
    this.submitQuiz();
  }
}


  // 👉 NEXT BUTTON
  next(): void {
    if (!this.selectedOption) return;

    // ✅ save answer for current question
    this.userAnswers[this.currentStep] = this.selectedOption;

    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      // ✅ restore previous answer if exists
      this.selectedOption = this.userAnswers[this.currentStep] || null;
      this.startTimer();
    } else {
      this.submitQuiz();
    }
  }

  // 👉 PREVIOUS BUTTON
  previous(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.selectedOption = this.userAnswers[this.currentStep] || null;
      this.startTimer();
    }
  }

 submitQuiz(): void {
  this.clearTimer(); // ⛔ STOP TIMER

  const userId = 1;
  this.quizService.submitAnswers(this.quizId, userId, this.userAnswers)
    .subscribe({
      next: (res) => {
        this.totalScore = res.score;
        this.isFinished = true;
      },
      error: (err) => console.error('Submission failed', err)
    });
}

}
