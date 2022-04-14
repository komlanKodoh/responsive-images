/**
 *
 * @param file Generate a base64 representation of a file blob
 */
export function getBase64(file: Blob) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  

  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
}

/**
 * Get the dimension width and height of the given image
 * @param file image
 */
export async function  getImageDimension(file: Blob){
    let img = new Image();
  
    var objectUrl = URL.createObjectURL(file);

    return new Promise<{width: number, height: number}>((resolve, reject) => {
      img.onload = function () {
       resolve({width: img.width, height: img.height});
        URL.revokeObjectURL(objectUrl);
      };
    })

}