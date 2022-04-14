import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeSnippetService {
  constructor() {}

  getCSS() {
    return `
    .wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .container {
      flex: 1;
      margin: 1em;
      position: relative;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }`;
  }

  getJavascript() {
    return `
  export class BBoom {

  constructor(private imageOptimizerService: ImageOptimizerService) {
    this.optimizationConfig = imageOptimizerService.getOptimizationConfigForm();
  }

  syncFile(file: File): void {
    this.file = file;
  }

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();

    let config = this.optimizationConfig.getRawValue() as OptimizationConfig;

    if (!this.file) return;
    this.imageOptimizerService
      .optimize(this.file, config)
      .subscribe((data: any) => console.log(data));
  }


  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}'
    }
  }

  }
`;
  }

  getHTML() {
    return `
      <mat-tab-group mat-align-tabs="start" class="block" dynamicHeight >
    <mat-tab label="CSS">
      <pre><code [highlight]="code"  [lineNumbers]="true" (highlighted)="onHighlight($event)" ></code></pre>
    </mat-tab>
    <mat-tab label="Javascript">Content 2</mat-tab>
    <mat-tab label="HTML">Content 3</mat-tab>
  </mat-tab-group>
    `;
  }
}
