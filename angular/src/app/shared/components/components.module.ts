import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ImageInputComponent } from './image-input/image-input.component';
import { NumberInputComponent } from './number-input/number-input.component';



@NgModule({
  declarations: [
    ImageInputComponent,
    NumberInputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports : [
    ImageInputComponent,
    NumberInputComponent
  ]
})
export class ComponentsModule { }
