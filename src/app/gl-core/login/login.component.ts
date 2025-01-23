import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../services/core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription = new Subscription();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    const {email, password} = this.loginForm.value;

    const sub = this.authService.login(email, password).subscribe(() => {
      this.router.navigateByUrl('/editor/widgets');
    });

    this.subscription.add(sub);
  }

  reset(): void {
    this.loginForm.reset();
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

}
