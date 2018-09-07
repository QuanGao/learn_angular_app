import { Component, OnInit } from '@angular/core';
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
    console.log(this.feedbackForm, 'this feedbackForm1')
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: '',
      lastName: '',
      telNum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    })
  }

  onSubmit() {
  //weird that when console.log feedbackFrom, the value property in feedbackFrom are nulls while feedback has all data
    console.log(this.feedbackForm, 'this feedbackForm2')
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback)  
    this.feedbackForm.reset();   
  }
}
