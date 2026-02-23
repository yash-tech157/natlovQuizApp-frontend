import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { Router } from '@angular/router';
import { vi } from 'vitest';

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = { navigate: vi.fn() };
    
    //  Clean up before every test
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear(); // Clean up after
    vi.restoreAllMocks();
  });

  it('should add Authorization header when token exists', () => {
    // Set the real localStorage item instead of spying on the getter
    localStorage.setItem('token', 'fake-jwt-token');

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    
    // Now this will be true because localStorage really has the token
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-jwt-token');
    
    req.flush({});
  });

  it('should redirect to login on 401 response and remove token', () => {
    localStorage.setItem('token', 'fake-jwt-token');
    
    //  Spy on Storage.prototype to correctly catch the 'removeItem' call
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    httpClient.get('/api/test').subscribe({
      error: () => {} // Catch the 401 error
    });

    const req = httpMock.expectOne('/api/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(removeItemSpy).toHaveBeenCalledWith('token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});