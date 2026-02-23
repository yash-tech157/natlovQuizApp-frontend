import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizService } from './quiz';
import { environment } from '../../environments/environment';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService]
    });
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no pending requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quizzes from API', () => {
    const mockQuizzes = [
      { id: 1, title: 'Java Basics', description: 'Test', questionsCount: 5 }
    ];

    service.getQuizzes().subscribe(quizzes => {
      expect(quizzes.length).toBe(1);
      expect(quizzes[0].title).toBe('Java Basics');
    });

    // Expect a GET request to the correct URL
    const req = httpMock.expectOne(`${environment.apiUrl}/quizzes`);
    expect(req.request.method).toBe('GET');
    
    // Send the mock data back
    req.flush(mockQuizzes);
  });

  it('should submit answers and return a score', () => {
    const mockResponse = { score: 4 };
    const quizId = 1;
    const answers = ['A', 'B', 'C', 'D'];

    service.submitAnswers(quizId, answers).subscribe(res => {
      expect(res.score).toBe(4);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/results/submit?quizId=${quizId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(answers); 
    
    req.flush(mockResponse);
  });
});