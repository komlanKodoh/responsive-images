import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent  {

  @Input() formGroup !: FormGroup;
  @Input() formControlName !: string;  

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
