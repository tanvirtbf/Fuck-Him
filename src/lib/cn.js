// Joins class names, skipping falsy values: cn("a", cond && "b", ["c"]) → "a b c"
export function cn(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}
