import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { provideRouter, Router } from '@angular/router';

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
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const {username, password} = this.loginForm.value;

    if (username === 'admin' && password === 'admin') {
      this.router.navigateByUrl('/editor/widgets');
    }
  }

  reset(): void {
    this.loginForm.reset();
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

}
