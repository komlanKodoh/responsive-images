import { Component, OnInit } from '@angular/core';
import { HighlightAutoResult } from 'ngx-highlightjs';
import { FormControl, FormGroup } from '@angular/forms';
import { OptimizationConfig } from '../shared/services/image-optimizer.config';
import { ImageOptimizerService } from '../shared/services/image-optimizer.service';
import { CodeSnippetService } from '../shared/services/code-snippet.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  file: File | null = null;

  response ?: HighlightAutoResult ;

  optimizationConfig: FormGroup;

  constructor(private imageOptimizerService: ImageOptimizerService, public codeSnippetService: CodeSnippetService) {
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

  getCSS(){
    return this.codeSnippetService.getCSS();
  }

  getJavascript(){
    return this.codeSnippetService.getJavascript();
  }

  getHTML(){
    return this.codeSnippetService.getHTML();
  }
}
