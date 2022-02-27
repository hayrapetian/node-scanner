export const urlRefactor = (url: string | undefined) => {
  if (!url?.endsWith("/")) {
    url += "/";
  }
  //for URL's like https://www.facebook.com/
  if (url?.includes("www")) {
    return (url?.split("www.").join(""));
  }
  return url;
};
