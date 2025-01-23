import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.less'
  })
  export class SignupComponent {
  
    signupForm: FormGroup;
    private _snackBar = inject(MatSnackBar);
    subscription = new Subscription();
  
    constructor(
      private fb: UntypedFormBuilder,
      private router: Router,
      private authService: AuthService
    ) {
      this.signupForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  
    signup(): void {
      const {username, email, password} = this.signupForm.value;
  
      const signupSub = this.authService.signup({
        username, email, password
      }).subscribe((user) => {
      
        this._snackBar.open(`User "${username}" created successfully!`, 'OK');
      });

      this.subscription.add(signupSub);
    }
  
    reset(): void {
      this.signupForm.reset();
    }

    goToLogin() {
      this.router.navigateByUrl('/login');
    }
  
  }
  