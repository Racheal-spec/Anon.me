export const changeTextFromHTML = (html: string) => {
  const el = document.createElement("span");
  el.innerHTML = html;
  return el.innerText;
};
