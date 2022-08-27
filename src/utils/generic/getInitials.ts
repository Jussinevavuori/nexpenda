export function getInitials(name: string) {
  return name
    .split(/[^a-zA-Z]/g)
    .filter(Boolean)
    .slice(0, 2)
    .map((_) => _.charAt(0))
    .map((_) => _.toUpperCase())
    .join("");
}
