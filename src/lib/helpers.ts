export const deepCopyObject = (objectToBeCopied): any =>
  JSON.parse(JSON.stringify(objectToBeCopied));
