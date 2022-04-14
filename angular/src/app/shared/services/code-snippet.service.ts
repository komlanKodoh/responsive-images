import { Injectable } from '@angular/core';

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

  getHTML(config: {
    imagesURI: string;
    folderName: string;
    imageSizes: string;
    placeholder: string;
    description: string;
    defaultImageSize: string;
    defaultImageFormat: string;
    dimension: { width: number; height: number };
  }) {
    return `
<div class="opt-img">
  <img src="${config.placeholder}"  decoding="async" > <img>

  <picture>
    <source type="image/webp" sizes="100vw"
        srcset="${config.imagesURI}${config.folderName}/250.webp 200w,
                ${config.imagesURI}${config.folderName}/500.webp 400w
                ${config.imagesURI}${config.folderName}/750.webp 700w" >

    <img style="opacity: 1;" sizes="${config.imageSizes}" decoding="async" loading="lazy"
        onLoad="onOptImgLoad"
        alt="${config.description}"
        src="${config.imagesURI}${config.folderName}/${config.defaultImageSize}.${config.defaultImageFormat}"
        width="${config.dimension.width}"
        height="${config.dimension.height}"
        srcset="${config.imagesURI}${config.folderName}/250.jpeg 200w,
                ${config.imagesURI}${config.folderName}/500.jpeg 400w
                ${config.imagesURI}${config.folderName}/750.jpeg 700w">
  </picture>      

</div>
    `;
  }
}
