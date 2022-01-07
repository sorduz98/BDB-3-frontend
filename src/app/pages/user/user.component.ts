import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userForm: FormGroup = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(10)]],
      identification: ['', [Validators.required, Validators.min(10000)]],
      birthdate: ['', [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  public loading = false;
  public error = '';
  public maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm.get('fullname')?.dirty
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    this.error = '';
    if(this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.createUser(this.userForm.value)
    .subscribe({
      next: (user) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      error: (err) => {
        this.error = err.error.message;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });

    console.log(this.userForm.value);
  }

}
