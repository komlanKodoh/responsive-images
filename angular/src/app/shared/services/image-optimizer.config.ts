


export interface OptimizationConfig {
    /**
     * Wether to include a jpeg version of the image or not
     */
    jpeg: boolean,
    /**
     * Wether to include a webp version of the image or not
     */
    webp: boolean,

    /**
     * File name to give to the zip file when
     * 
     * > This name is also used in the path given in the code snippet
     */
    fileName: string
}