/* eslint-disable @typescript-eslint/no-explicit-any */
export function getAverageRGB(imgEl: any) {
  const blockSize = 5,
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    rgb = { r: 0, g: 0, b: 0 };
  let data,
    i = -4,
    count = 0;

  if (!context) {
    return null;
  }

  const height = (canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height),
    width = (canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);
  if (!height || !width) {
    return null;
  }
  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    console.log(e);
    /* security error, img on diff domain */
    return null;
  }

  const length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}

export const displayTimeSong = (seconds: number) => {
  if (!seconds) {
    return "0:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
  }`;
};
