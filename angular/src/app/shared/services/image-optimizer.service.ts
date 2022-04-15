import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OptimizationConfig, OptimizationConfigForm } from './image-optimizer.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageOptimizerService {
  constructor(private http: HttpClient) {}

  optimize(file: File, config?: OptimizationConfig) {
    const formData = new FormData();

    formData.append('image', file);

    if (config) {
      // images encodings
      formData.append('png', JSON.stringify(config.png));
      formData.append('jpeg', JSON.stringify(config.jpeg));
      formData.append('webp', JSON.stringify(config.webp));

      // image sizes
      formData.append('sizes', JSON.stringify(config.sizes));
    }

    return this.http.post('/api/image/', formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'json',
    });
    
  }

  /**
   * Generates a form group with the following form field;
   *
   * jpeg, webp, png, 250, 500, 750, 1000, fileName, root
   *
   */
  static getOptimizationConfigForm(): import('@angular/forms').FormGroup {
    return new FormGroup({
      // image format
      jpeg: new FormControl(true),
      webp: new FormControl(true),
      png: new FormControl(false),

      // sizes
      250: new FormControl(false),
      500: new FormControl(false),
      750: new FormControl(false),
      1000: new FormControl(false),
    });
  }


  /**
   * processes an {@link OptimizationConfigForm} and returns an {@link OptimizationConfig} object
   */
  static processOptimizationConfigForm(form : OptimizationConfigForm ) {

    let config = {...form, sizes: [] } as OptimizationConfig;

    (["250","500","750","1000"] as const).forEach(size => {
      if ( form[size] ) config.sizes.push(size);
    })

    return config;
  }
}
