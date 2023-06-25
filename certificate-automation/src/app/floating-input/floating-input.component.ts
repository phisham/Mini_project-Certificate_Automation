import { Component,Input ,OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-input',
  templateUrl: './floating-input.component.html',
  styleUrls: ['./floating-input.component.css']
})
export class FloatingInputComponent implements OnInit {
  @Input() label!:any;
  constructor() { }

  ngOnInit(): void {
  }

}
