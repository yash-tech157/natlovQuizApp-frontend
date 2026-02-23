import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
// ✅ ADD THIS IMPORT
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuizEditorComponent } from './quiz-editor.component';
import { vi } from 'vitest'; // Import vi explicitly

describe('QuizEditorComponent', () => {
  let component: QuizEditorComponent;
  let fixture: ComponentFixture<QuizEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ ADD NoopAnimationsModule HERE
      imports: [QuizEditorComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty, invalid form', () => {
    expect(component.quizForm.valid).toBeFalsy();
    expect(component.questions.length).toBe(0);
  });

  it('should add a question group when addQuestion is called', () => {
    component.addQuestion();
    expect(component.questions.length).toBe(1);
    expect(component.questions.at(0).get('correctAnswer')?.value).toBe('');
  });
});