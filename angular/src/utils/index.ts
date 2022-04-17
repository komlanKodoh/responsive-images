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
export async function getImageDimension(file: Blob) {
  let img = new Image();

  if (!URL) {
    return new Promise<{ width: number; height: number }>((resolve) => {
      resolve({ width: 0, height: 0 });
    });
  }

  var objectUrl = URL.createObjectURL(file);

  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    img.onload = function () {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  });

}

/**
 * A file name returned by our api is of the form <ORIGINAL_FILENAME>-<UNIQUE_ID>.zip
 * This function parses the name and returns a name of the form <ORIGINAL_FILENAME>.zip
 */
export function extractFileName(fileName: string){
  
  let i;
  for (i = fileName.length - 1; i >= 0; i--){
    if ( fileName[i] === "-"){
      return fileName.slice(0, i);
    }
  }

  return fileName;
}


/**
 * Returns a random index from the given array
 */
 export const getRandomIndex = <T extends unknown>(items: T[]) =>
 items[Math.floor(Math.random() * items.length)];
