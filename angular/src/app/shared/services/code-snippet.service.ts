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
    placeholder: string;
    dimension: { width: number; height: number };
    imagesURI: string;
  }) {
    return `
<div class="opt-img">
  <img src="${config.placeholder}"  decoding="async" > <img>

  <picture>
    <source type="image/webp" sizes="100vw"
        srcset="${config.imagesURI}/200.webp 200w,
                ${config.imagesURI}/400.webp 400w
                ${config.imagesURI}/400.webp 700w" >

    <img style="opacity: 1;" sizes="100vw" decoding="async" loading="lazy"
        onLoad="onOptImgLoad"
        alt="view it search preview"
        src="${config.imagesURI}/200.png"
        width="${config.dimension.width}"
        height="${config.dimension.height}"
        srcset="${config.imagesURI}/200.jpeg 200w,
                ${config.imagesURI}/400.jpeg 400w
                ${config.imagesURI}/400.jpeg 700w">
  </picture>      

</div>
    `;
  }
}
