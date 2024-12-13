export const getAppLink = (link: string) => {
  if (link.startsWith("http")) {
    return link;
  }

  if (window.location.hostname === "localhost") {
    return `http://localhost:8080${link.startsWith("/") ? "" : "/"}${link}`;
  }

  return `${window.location.origin}${link.startsWith("/") ? "" : "/"}${link}`;
};
