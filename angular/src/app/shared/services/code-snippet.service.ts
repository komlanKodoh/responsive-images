import { Injectable } from '@angular/core';
import { configFileName } from '@scullyio/scully/src/lib/utils';
import { ImageFormat, ImageSize } from './image-optimizer.types';

@Injectable({
  providedIn: 'root',
})
export class CodeSnippetService {
  constructor() {}

  getCSS() {
    return `
.opt-img{
  position: relative;
}

.opt-img > img {
  top: 0;
  left: 0;
  z-index:  10;
  position: absolute;
  transition: opacity 0.5s ease-in-out;
}

.opt-img.loaded > img {
  opacity: 0;
}

    `;
  }

  getJavascript() {
    return `

<script>
    function onOptImgLoad(e){
      const parent = e.target.parentNode.parentNode.classList.add("loaded");
    } 
</script>

`;
  }

  getHTML(config: codeSnippetConfig) {
    if (!config.placeholder) {
      return `<picture>
      ${config.availableImageFormat
        .filter((format) => format !== config.defaultImageFormat)
        .map((format) =>
          this.getPictureSourceTag({
            format,
            pathName: config.imagesURI + config.folderName,
            availableSizes: config.availableImageSizes,
          })
        )
        .join('\n    ')}
      ${this.getDefaultImageTag(config)}
</picture>`;
    }
    return `
<div class="opt-img">
  <img src="${config.placeholder}"  decoding="async" />
  <picture>
    ${config.availableImageFormat
      .filter((format) => format !== config.defaultImageFormat)
      .map((format) =>
        this.getPictureSourceTag({
          format,
          pathName: config.imagesURI + config.folderName,
          availableSizes: config.availableImageSizes,
        })
      )
      .join('\n    ')}
    ${this.getDefaultImageTag(config)}
  </picture>      
</div>`;
  }

  getDefaultImageTag(config: codeSnippetConfig) {
    return `<img style="opacity: 1;" sizes="${
      config.imageSizes
    }" decoding="async" loading="lazy"
    onLoad="onOptImgLoad"
    alt="${config.description}"
    src="${config.imagesURI}${config.folderName}/${config.defaultImageSize}.${
      config.defaultImageFormat
    }"
    width="${config.dimension.width}"
    height="${config.dimension.height}"
    ${this.createSourceSet({
      pathName: config.imagesURI + config.folderName,
      format: config.defaultImageFormat,
      availableSizes: config.availableImageSizes,
    })}/>`;
  }

  getPictureSourceTag(config: {
    format: ImageFormat;
    pathName: string;
    availableSizes: ImageSize[];
  }) {
    return `<source type="image/${config.format}" sizes="100vw" 
    ${this.createSourceSet(config)}/>
`;
  }

  createSourceSet(config: {
    pathName: string;
    format: ImageFormat;
    availableSizes: ImageSize[];
  }) {
    const getSizeDirective = (size: ImageSize) => {
      return `${config.pathName}/${size}.${config.format} ${size}w`;
    };

    return `srcset="${config.availableSizes
      .map((size) => getSizeDirective(size))
      .join(',\n            ')}"`;
  }
}

interface codeSnippetConfig {
  imagesURI: string;
  folderName: string;
  imageSizes: string;
  placeholder: string;
  description: string;
  defaultImageSize: ImageSize;
  defaultImageFormat: ImageFormat;
  availableImageSizes: ImageSize[];
  availableImageFormat: ImageFormat[];
  dimension: { width: number; height: number };
}
