import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

// Declare google globally so TypeScript doesn't complain
declare const google: any;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  activeTab: 'login' | 'signup' = 'signup';

  loginForm: FormGroup;
  signupForm: FormGroup;

  loginLoading  = false;
  signupLoading = false;
  loginMsg      = '';
  loginMsgType  = '';
  signupMsg     = '';
  signupMsgType = '';

  showLoginPw   = false;
  showSignupPw  = false;
  showConfirmPw = false;

  readonly GOOGLE_CLIENT_ID = '527074224256-kvj81f43lkfq7ug61g1dglam3t74b211.apps.googleusercontent.com';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,15}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      this.renderGoogleButton('google-login-btn-box');
      this.renderGoogleButton('google-signup-btn-box');
    });
  }

  loadGoogleScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any)['google']?.accounts) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  renderGoogleButton(elementId: string): void {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (!el) return;

      google.accounts.id.initialize({
        client_id: this.GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleGoogleCallback(response)
      });

      google.accounts.id.renderButton(el, {
        type: 'standard',
        size: 'large',
        theme: 'outline',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: 280
      });
    }, 200);
  }

  handleGoogleCallback(response: any): void {
    const idToken = response.credential;
    this.ngZone.run(() => {
      this.loginLoading = true;
      this.signupLoading = true;
      this.loginMsg = '';
      this.signupMsg = '';

      this.authService.googleLogin(idToken).subscribe({
        next: () => {
          this.loginMsg = '✓ Google Login successful! Redirecting...';
          this.loginMsgType = 'success';
          this.signupMsg = '✓ Google Login successful! Redirecting...';
          this.signupMsgType = 'success';
          setTimeout(() => this.router.navigate(['/dashboard']), 700);
        },
        error: (err: any) => {
          const msg = err.error?.message || 'Google login failed. Please try again.';
          this.loginMsg = msg;
          this.loginMsgType = 'error';
          this.signupMsg = msg;
          this.signupMsgType = 'error';
          this.loginLoading = false;
          this.signupLoading = false;
        }
      });
    });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirm  = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  switchTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
    this.clearMessages();
    // Re-render button for the newly visible tab
    setTimeout(() => {
      const id = tab === 'login' ? 'google-login-btn-box' : 'google-signup-btn-box';
      this.renderGoogleButton(id);
    }, 50);
  }

  clearMessages(): void {
    this.loginMsg = '';
    this.signupMsg = '';
  }

  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginLoading = true;
    this.loginMsg = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loginMsg     = '✓ Login successful! Redirecting...';
        this.loginMsgType = 'success';
        setTimeout(() => this.router.navigate(['/dashboard']), 700);
      },
      error: (err: any) => {
        this.loginMsg     = err.error?.message || 'Invalid credentials. Please try again.';
        this.loginMsgType = 'error';
        this.loginLoading = false;
      }
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.signupLoading = true;
    this.signupMsg = '';
    const payload = this.signupForm.value;
    this.authService.signup(payload).subscribe({
      next: () => {
        this.signupMsg     = '✓ Account created! Please login.';
        this.signupMsgType = 'success';
        this.signupForm.reset();
        this.signupLoading = false;
        setTimeout(() => this.switchTab('login'), 1200);
      },
      error: (err: any) => {
        this.signupMsg     = err.error?.message || 'Signup failed. Email may already be registered.';
        this.signupMsgType = 'error';
        this.signupLoading = false;
      }
    });
  }
}