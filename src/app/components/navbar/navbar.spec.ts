import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],  // ✅ correct component
      providers: [
        provideRouter([])          // ✅ router fix
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);  // ✅ create
    component = fixture.componentInstance;               // ✅ assign
    fixture.detectChanges();                             // ✅ initialize
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});