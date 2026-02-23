import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-editor',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './quiz-editor.component.html',
  styleUrl: './quiz-editor.component.scss',
})
export class QuizEditorComponent implements OnInit {
  quizForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuizEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.data) {
      this.patchExistingData();
    }
  }

  // Initialize the main form group
  private initForm() {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      questionsList: this.fb.array([]) // FormArray handles the dynamic list of questions
    });
  }

  // Getter for easy access to the questions array in the HTML template
  get questions() {
    return this.quizForm.get('questionsList') as FormArray;
  }

  // Creates a new FormGroup for a single question with validation
  createQuestionGroup(qData?: any): FormGroup {
    return this.fb.group({
      questionText: [qData?.questionText || '', Validators.required],
      optionA: [qData?.optionA || '', Validators.required],
      optionB: [qData?.optionB || '', Validators.required],
      optionC: [qData?.optionC || '', Validators.required],
      optionD: [qData?.optionD || '', Validators.required],
      // Regex ensures they only type A, B, C, or D (case-insensitive)
      correctAnswer: [qData?.correctAnswer || '', [Validators.required, Validators.pattern(/^[A-D]$/i)]] 
    });
  }

  // Adds an empty question form to the FormArray
  addQuestion() {
    this.questions.push(this.createQuestionGroup());
  }

  // Removes a question from the FormArray
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  // Fills the form if we are editing an existing quiz
  private patchExistingData() {
    this.quizForm.patchValue({
      title: this.data.title,
      description: this.data.description
    });
    
    if (this.data.questionsList) {
      this.data.questionsList.forEach((q: any) => {
        this.questions.push(this.createQuestionGroup(q));
      });
    }
  }

  // Submits the data back to the DashboardComponent
  onSave() {
    if (this.quizForm.valid) {
      const finalData = {
        ...this.quizForm.value,
        questionCount: this.questions.length 
      };
      this.dialogRef.close(finalData);
    }
  }
}