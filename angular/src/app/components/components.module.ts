import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CodeDisplayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    CodeDisplayComponent
  ]
  
})
export class ComponentsModule { }
