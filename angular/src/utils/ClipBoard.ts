function fallbackCopyTextToClipboard(text: string) {
  
  let textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand('copy');
    if (!successful) { throw new Error("something bad happened")}
  } catch (err) {
    return err as Error;
  }

  document.body.removeChild(textArea);
  return undefined;
}

export function copyTextToClipboard(text: string, cb: (error?: Error) => void ) {
  
  if (!navigator.clipboard) {
    let error = fallbackCopyTextToClipboard(text);

    if (error ) { return cb(error); }
    return cb();
  }

  navigator.clipboard.writeText(text).then(
    function () {
      cb()
    },
    function (error: Error) {
     cb(error)
    }
  );
}


export default {
  copyTextToClipboard
}