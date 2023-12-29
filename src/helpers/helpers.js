const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
};

export const imgToFile = (dataURI) => {
  const blob = dataURItoBlob(dataURI);
  const file = new File([blob], "image.png", { type: "image/png" });
  return file;
};

export const createJSONfile = (dataObject) => {
  const jsonData = JSON.stringify(dataObject);
  const blob = new Blob([jsonData], { type: "application/json" });
  const file = new File([blob], dataObject.name, { type: "application/json" });

  return file;
};
