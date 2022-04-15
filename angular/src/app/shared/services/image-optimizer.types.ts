


export interface OptimizationConfig {
    /**
     * Wether to include a jpeg/webp/png version of the image or not
     */
    jpeg: boolean;
    webp: boolean;
    png: boolean;
  
    /**
     * The file image sizes the optimizer should include
     */
  
    sizes: ImageSizes[];
  }
  

export interface OptimizationConfigForm {
    /**
     * Wether to include a jpeg/webp/png version of the image or not
     */
    jpeg: boolean,
    webp: boolean,
    png : boolean, 

    /**
     * The file image sizes the optimizer should include
     */

    250: boolean,
    500: boolean,
    750: boolean,
    1000 : boolean,
}


export type ImageFormat = 'jpeg' | 'png' | 'webp';
export type ImageSizes = '250' | '500' | '750' | '1000';
