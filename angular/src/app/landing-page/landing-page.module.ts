import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsiveImageSnippetModule } from '../components/responsive-image-snippet/responsive-image-snippet.module';

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ResponsiveImageSnippetModule
  ]
})
export class LandingPageModule { }
