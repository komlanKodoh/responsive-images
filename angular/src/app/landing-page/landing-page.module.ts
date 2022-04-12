import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LandingPageModule { }
