import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*
   * User login to the app
   */
  login() {
    this.authService.login(this.form.value).catch(e => alert(e.message));
  }

  /*
   * Register a new user
   */
  registerUser() {
    this.authService.createUser(this.form.value).catch(e => alert(e.message));
  }
}
