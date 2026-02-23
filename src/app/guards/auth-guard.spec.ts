import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth-guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { vi } from 'vitest'; // Add this import

describe('authGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Use vi.fn() instead of jasmine.createSpy
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: AuthService, useValue: { getRole: () => null, getUserInfo: () => of(null) } }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should redirect to login if no token is found', () => {
    // Use vi.spyOn instead of spyOn
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    
    // Use toBe(false) or toBeFalsy()
    expect(result).toBe(false); 
  });
});