export function toggleInList<T>(items: T[], item: T): T[] {
  if (items.includes(item)) {
    return items.filter(i => i !== item);
  } else {
    return [...items, item];
  }
}

export function parseBool(bool?: string): boolean | undefined {
  if (bool === "true") {
    return true;
  } else if (bool === "false") {
    return false;
  } else {
    return undefined;
  }
}
