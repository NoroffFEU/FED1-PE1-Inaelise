export function shortenString(str, max) {
  const shorten = str.indexOf(" ", max);
  if (shorten === -1) {
    return str;
  }
  return str.substring(0, shorten) + "...";
}
