
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    // MatSelectModule,
    // MatRadioModule,
    // MatDatepickerModule,
    // MatCheckboxModule,
    // MatAutocompleteModule,
    // MatDatepickerModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatIconModule,
  ],
})
export class MaterialModule {}
