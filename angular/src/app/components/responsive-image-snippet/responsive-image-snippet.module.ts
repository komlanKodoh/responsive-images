import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveImageSnippetComponent } from './responsive-image-snippet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ResponsiveImageSnippetComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [ResponsiveImageSnippetComponent]
})
export class ResponsiveImageSnippetModule { }
