'use client'
export const changeTextFromHTML = (html: string) => {
  if (typeof window !== 'undefined') {
    const el = document.createElement("span");
    el.innerHTML = html;
    return el.innerText;
  }
  return '';
};
