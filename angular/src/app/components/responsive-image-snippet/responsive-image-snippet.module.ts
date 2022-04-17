import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveImageSnippetComponent } from './responsive-image-snippet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import {CodeDisplayComponent} from "../code-display/code-display.component"
import { ComponentsModule } from '../components.module';


@NgModule({
  declarations: [
    ResponsiveImageSnippetComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [ResponsiveImageSnippetComponent]
})
export class ResponsiveImageSnippetModule { }
