import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CodeSnippetService } from 'src/app/shared/services/code-snippet.service';

@Component({
  selector: 'app-responsive-image-snippet',
  templateUrl: './responsive-image-snippet.component.html',
  styleUrls: ['./responsive-image-snippet.component.scss'],
})
export class ResponsiveImageSnippetComponent implements OnInit {
  @Input() SnippetData!: SnippetData;

  snippetConfigForm: FormGroup;
  constructor(
    private codeSnippetService: CodeSnippetService,
    private formBuilder: FormBuilder
  ) {
    this.snippetConfigForm = formBuilder.group({
      imagesURI: '/static/',
      imageSizes: '100vw',
      defaultImageSize: '500',
      defaultImageFormat: 'jpeg',
      description: 'author was to lazy to add a description',
    });
  }

  ngOnInit(): void {}

  getCSS() {
    return this.codeSnippetService.getCSS();
  }

  getJavascript() {
    return this.codeSnippetService.getJavascript();
  }

  getHTML() {
    return this.codeSnippetService.getHTML({
      ...this.SnippetData,
      ...this.snippetConfigForm.value,
    });
  }
}

interface SnippetData {
  placeholder: string;
  dimension: { width: number; height: number };
  folderName: string;
}

