import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OptimizationConfig } from './image-optimizer.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageOptimizerService {
  constructor(private http: HttpClient) {}

  optimize(file: File, config?: OptimizationConfig) {
    console.log(file, config);

    const formData = new FormData();

    formData.append('image', file);

    if (config) {
      formData.append('jpeg', JSON.stringify(config.jpeg));
      formData.append('webp', JSON.stringify(config.webp));
      formData.append('fileName', config.fileName);
    }

    return this.http.post('/api/optimization', formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'json',
    });
  }

  getOptimizationConfigForm(): import('@angular/forms').FormGroup {
    return new FormGroup({
      jpeg: new FormControl(''),
      webp: new FormControl(''),
      fileName: new FormControl(''),
    });
  }
}
