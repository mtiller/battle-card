export function niceList(names: string[], none: string): string {
  if (names.length == 0) return none;
  const tail = names[names.length - 1];
  if (names.length == 1) return tail;
  return names.slice(0, -1).join(", ") + " and " + tail;
}
