export const FormatDate = (val: string) => {
  let timestamp = Date.parse(val);
  let date = new Date(timestamp);
  let day = date.getDate() < 10 ? 0 + `${date.getDate()}` : date.getDate();
  //let monthnumber = date.getMonth();
  let month = date.toLocaleString("en-US", {
    month: "short",
  });
  let year = date.getFullYear();
  let result = `${day}.${month}.${year}`;
  return result;
};
