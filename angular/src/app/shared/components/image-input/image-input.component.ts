import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getBase64, getImageDimension } from '../../../../utils';
@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent implements OnInit {
  image = new FormControl();
  preview: string | ArrayBuffer | null = null;
  size : {width: number, height: number} = {width: 0, height: 0};

  @Output() newImageEvent = new EventEmitter<File>();

  constructor() {}

  async syncImage(e: Event) {
    let files = (e.target as HTMLInputElement).files as FileList;
    let file = files[0];

    // Notifies parent component of the image change
    this.newImageEvent.emit(file);

    console.log("we are before the vent ")
    let [base64, size] = await Promise.all([
      getBase64(file),
      getImageDimension(file),
    ]);

    console.log(size, base64);

    this.size = size
    this.preview = base64;
  }

  ngOnInit(): void {}
}
