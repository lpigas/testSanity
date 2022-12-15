function pageName(string) {
  let pageName = "";
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] === "/") {
      pageName = "";
    } else {
      pageName += string[i];
    }
  }
  return pageName;
}

export default pageName;
