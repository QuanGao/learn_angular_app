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

  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
  
      telNum: [0,Validators.required],
      email: ['', Validators.required],


      agree: false,
      contactType: 'None',
      message: ''
      
    })
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
