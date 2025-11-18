import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/,/g, "")     
    .replace(/\s+/g, "-")   
    .trim();
}