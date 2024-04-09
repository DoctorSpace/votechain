export const shortening = (data) => {
  return data.slice(0, 5) + "..." + data.slice(data.length-5, data.length);
};
