import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSuccessComponent } from './login-success.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('LoginSuccessComponent', () => {
  let component: LoginSuccessComponent;
  let fixture: ComponentFixture<LoginSuccessComponent>;
  let mockRouter: any;
  // Define the spy variable
  let setItemSpy: any;

  const mockAuthService = {
    getUserInfo: vi.fn()
  };

  beforeEach(async () => {
    mockRouter = { navigate: vi.fn() };
    // Clear previous items
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [LoginSuccessComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { 
          provide: ActivatedRoute, 
          useValue: { queryParams: of({ token: 'fake-jwt-token' }) } 
        },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSuccessComponent);
    component = fixture.componentInstance;
    
    // ✅ FIX: Create the spy BEFORE detectChanges() runs ngOnInit
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should save token and route GameMaster to admin dashboard', () => {
    mockAuthService.getUserInfo.mockReturnValue(of({ role: 'ROLE_GAMEMASTER' }));
    
    fixture.detectChanges(); // This triggers ngOnInit -> localStorage.setItem

    expect(setItemSpy).toHaveBeenCalledWith('token', 'fake-jwt-token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
  });

  it('should save token and route Player to quiz list', () => {
    mockAuthService.getUserInfo.mockReturnValue(of({ role: 'ROLE_PLAYER' }));
    
    fixture.detectChanges(); 

    // We can also verify by checking the actual value
    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/quizzes']);
  });
});