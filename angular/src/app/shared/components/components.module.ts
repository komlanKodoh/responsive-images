import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageInputComponent } from './image-input/image-input.component';



@NgModule({
  declarations: [
    ImageInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports : [
    ImageInputComponent
  ]
})
export class ComponentsModule { }
