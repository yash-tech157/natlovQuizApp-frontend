import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Ensure these are imported
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-editor',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './quiz-editor.component.html',
  styleUrl: './quiz-editor.component.scss',
})
export class QuizEditorComponent implements OnInit {
  quizTitle: string = '';
  quizDescription: string = '';
  questionCount: number = 0;

  questionsList: any[] = [];

  newQuestion = {
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  };

  addQuestionToList() {
    if (this.newQuestion.questionText && this.newQuestion.correctAnswer) {
      this.questionsList.push({ ...this.newQuestion });
      // Reset the form for the next question
      this.newQuestion = { questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '' };
    }
  }

  removeQuestion(index: number) {
    this.questionsList.splice(index, 1);
  }
  constructor(
    public dialogRef: MatDialogRef<QuizEditorComponent>, // Fixes Property 'dialogRef' error
    @Inject(MAT_DIALOG_DATA) public data: any           // Fixes Property 'data' error
  ) {}

ngOnInit() {
  if (this.data) {
    this.quizTitle = this.data.title;
    this.quizDescription = this.data.description || '';
    // Load existing questions so they aren't lost on save
    this.questionsList = this.data.questionsList || []; 
    this.questionCount = this.questionsList.length; 
  }
}
onSave() {
  const quizData = {
    title: this.quizTitle,
    description: this.quizDescription,
    questionCount: this.questionsList.length, 
    questionsList: this.questionsList        
  };
  this.dialogRef.close(quizData);
}
}