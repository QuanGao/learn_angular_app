import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  words: String;
  
  constructor() { }

  ngOnInit() {
  }

  onClickBtn(){
    this.words = "hello"

    console.log("clicked")
  }
}
