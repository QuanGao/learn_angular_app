import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
  @Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
  })
export class DishdetailComponent implements OnInit {
  @Input()  
  dish: Dish;

  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  comment: Comment;

  constructor(private dishservice: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap(
      (params: Params) => this.dishservice.getDish(+params['id'])
      )
    ).subscribe( dish => {
      this.dish = dish;
      this.setPrevNext(dish.id);
    })

    this.createForm();
  }

  formErrors = {
    'author':'',
    'rating':'',
    'comment':''
  }

  validationMessages = {
    'author': {
      'required':"name is required",
      'minlength':"name is at least 2 characters"
    },
    'rating':{
      'required':'rating is required'
    },
    'comment':{
      'required':'content is required'
    }
  }
  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      date: [new Date(), Validators.required ],
      rating: [5, Validators.required],
      comment: ['', Validators.required]
    })

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm){
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      console.log(field)
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid){

          console.log(control,)
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            this.formErrors[field] += messages[key] + ' ';
            console.log(messages[key])
          }
        }
      }
    }
  }

  onSubmit() {
      
    this.comment= this.commentForm.value;
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      date: Date()
    });   

    this.dish.comments.push(this.comment);
    }


  setPrevNext(dishId: number){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[ (this.dishIds.length + index -1 ) % this.dishIds.length ];
    this.next = this.dishIds[ (this.dishIds.length + index +1 ) % this.dishIds.length ];
  }

  goBack(): void {
    this.location.back();
  }
}
