import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm.get('fullname')?.dirty
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    console.log(this.userForm.value);
  }

}
