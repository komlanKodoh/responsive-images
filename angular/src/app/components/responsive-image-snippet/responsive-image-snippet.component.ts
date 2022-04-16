import { ImageSize } from './../../shared/services/image-optimizer.types';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CodeSnippetService } from 'src/app/shared/services/code-snippet.service';
import { ImageFormat } from 'src/app/shared/services/image-optimizer.types';

@Component({
  selector: 'app-responsive-image-snippet',
  templateUrl: './responsive-image-snippet.component.html',
  styleUrls: ['./responsive-image-snippet.component.scss'],
})
export class ResponsiveImageSnippetComponent implements OnInit {
  @Input() snippetData!: SnippetData;

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
    if (!this.snippetData.placeholder) {return '';}
    return this.codeSnippetService.getCSS();
  }

  getJavascript() {
    if (!this.snippetData.placeholder) {return '';}
    return this.codeSnippetService.getJavascript();
  }

  getHTML() {
    return this.codeSnippetService.getHTML({
      ...this.snippetData,
      ...this.snippetConfigForm.value,
      availableImageFormat: (['jpeg', 'png', 'webp'] as const).filter(
        (format) => this.snippetData.availableImageFormat[format]
      ),
    });
  }

  /**
   * Tells if an image can be included in the snippet
   */

  formatIsAvailable(format: ImageFormat): boolean {
    return this.snippetData.availableImageFormat[format] || false;
  }

  imageSizeIsAvailable(size: ImageSize) {
    return this.snippetData.availableImageSizes.includes(size);
  }
}

interface SnippetData {
  /**
   * Base 64 version of the image ( serves as a preview if the image has not yet loaded )
   */
  placeholder: string;

  /**
   * image width and height ( used to prevent cumulative layout shifts)
   */
  dimension: { width: number; height: number };

  /**
   * The name of the folder in which  the images are stored.
   * If not changed, this will correspond to the name of the zip archive
   */
  folderName: string;

  /**
   * A list of all the image format that the user has selected
   */
  availableImageFormat: { [K in ImageFormat]?: boolean };

  /**
   * A list of all the image sizes that the user has selected
   */
  availableImageSizes: ImageSize[];
}
