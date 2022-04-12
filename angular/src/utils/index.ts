
/**
 * 
 * @param file Generate a base64 representation of a file blob
 */
export function getBase64(file : Blob ) {

    var reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<string | ArrayBuffer | null >((resolve, reject) => {
        reader.onload = function () {
          resolve(reader.result)
        };

        reader.onerror = function (error) {
          reject(error)
        };
    }) 

 }
 