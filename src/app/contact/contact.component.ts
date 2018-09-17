import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    // @ViewChild('fform') feedbackFormDirective;
  }

  formErrors = {
    'firstName': '',
    'lastName': '',
    'telNum': '',
    'email': ''
  }

  validationMessages = {
    'firstName': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'Frist name can not be more than 25 characters long.'
    },
    'lastName': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name can not be more than 25 characters long.'
    },
    'telNum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must only contain numbers'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format'
    }
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telNum: [0, [Validators.required, Validators.pattern('[0-9]+')] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contactType: 'None',
      message: '' 
    })

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm){
      console.log("!this.feedbackForm")
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      console.log("field: " + field)
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        console.log(control,)
        if (control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          console.log(messages);
          for(const key in control.errors){
            console.log(key,)
            this.formErrors[field] += messages[key] + ' '
          }
        }
      }
    }
  }

  onSubmit() {
  //weird that when console.log feedbackFrom, the value property in feedbackFrom are nulls while feedback has all data
    this.feedback = this.feedbackForm.value;

    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      telNum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });   
    // this.feedbackFormDirective.resetForm();
  }
}
