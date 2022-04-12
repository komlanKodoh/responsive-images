import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OptimizationConfig } from '../shared/services/image-optimizer.config';
import { ImageOptimizerService } from '../shared/services/image-optimizer.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})

export class LandingPageComponent implements OnInit {
  file: File | null = null;

  optimizationConfig :FormGroup;

  constructor(private imageOptimizerService: ImageOptimizerService) {
    this.optimizationConfig = imageOptimizerService.getOptimizationConfigForm()
  }

  syncFile(file: File): void {
    this.file = file;
  }

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault()

    let config = this.optimizationConfig.getRawValue() as OptimizationConfig

    if (this.file) this.imageOptimizerService.optimize(this.file, config );
  }
}
