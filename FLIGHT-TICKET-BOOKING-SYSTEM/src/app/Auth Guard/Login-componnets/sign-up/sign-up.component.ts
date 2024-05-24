import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogsService } from '../../Services/logs.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm:any= FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private signUp :LogsService,private router:Router,) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      
      

      let creds = {
        firstName: this.registerForm.get('firstName')!.value,
        lastName: this.registerForm.get('lastName')!.value,
        email: this.registerForm.get('email')!.value,
        password: this.registerForm.get('password')!.value,
        confirmpassword: this.registerForm.get('confirmpassword')!.value,
      };
     
      this.signUp.createNewUser(creds).subscribe({
        next:(response:any)=>{
          alert(response.message);
        this.router.navigate(['/login'])},
        error:err=>alert(err)
      })
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

}
