function titleCase(string) {
  const newString = string
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
  return newString;
}

function toBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
      return false;

    default:
      return Boolean(string);
  }
}

export { titleCase, toBoolean };
