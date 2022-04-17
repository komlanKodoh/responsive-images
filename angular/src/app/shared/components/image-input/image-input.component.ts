import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() label!: string ;
  @Output() newImageEvent = new EventEmitter<FileAndSize>();

  constructor() {}

  async syncImage(e: Event) {
    let files = (e.target as HTMLInputElement).files as FileList;
    let file = files[0] as FileAndSize;


    

    // Notifies parent component of the image change
    
    let [base64, size] = await Promise.all([
      await getBase64(file),
      await getImageDimension(file),
    ]);
    
    file.dimension = size;
    this.newImageEvent.emit(file);
    
    this.size = size
    this.preview = base64;
  }

  ngOnInit(): void {}
}


export type FileAndSize = File & {dimension: {width: number, height: number}};
