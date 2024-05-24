import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogsService } from '../../Services/logs.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../Services/shared-data.service';
import { User } from 'src/app/_models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:any= FormGroup;
  submitted = false;
  user={email:'', password:'', rememberMe:'' }

  constructor(private formBuilder: FormBuilder,private login :LogsService,
              private sharedData:SharedDataService,private router:Router,) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //     this.submitted = true;
  //     if (this.loginForm.invalid) {
  //         return;
  //     }
  //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  // }

  onSubmit() { 
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  
    let creds = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };
  
    this.login.checkLogin(creds).subscribe({
      next: (response: any) => {       
        if (response.token) {
          alert(response.message);
          this.sharedData.LoggedIn(true);
          this.login.setToken(response.token);
          this.router.navigate(['/search-flight']);
        } else {
          alert(response.message);
        }
      },
      error: (err: any) => {
        console.error(err);
        alert("User Not exist");
      }
    });
  }
  
}
