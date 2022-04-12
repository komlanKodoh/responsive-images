import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { ImageInputComponent } from './components/image-input/image-input.component';
import { ComponentsModule } from "./components/components.module";


@NgModule({
  exports: [
    MaterialModule,
    ComponentsModule
  ]
})

export class SharedModule {}
