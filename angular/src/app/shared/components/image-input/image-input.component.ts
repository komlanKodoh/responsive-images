import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {getBase64 } from "../../../../utils"
@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent implements OnInit {
  
  image = new FormControl();
  preview: string | ArrayBuffer | null = null;

  @Output() newImageEvent = new EventEmitter<File>();

  constructor() {}

  async syncImage(e: Event) {
    let files = (e.target as HTMLInputElement).files as FileList;
    let file = files[0];

    // Notifies parent component of the image change
    this.newImageEvent.emit(file)

    let base64 = await getBase64(file);

    this.preview = base64;
  }

  ngOnInit(): void {}
}
