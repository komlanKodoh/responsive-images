import { SyntaxHighlightingModule } from './syntax-highlighting/syntax-highlighting.module';
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { ComponentsModule } from "./components/components.module";


@NgModule({
  exports: [
    MaterialModule,
    ComponentsModule,
    SyntaxHighlightingModule,
  ]
})

export class SharedModule {}
