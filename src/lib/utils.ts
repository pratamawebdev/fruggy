import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const transition = "hover:transition-all hover:ease-in hover:duration-200";

export const hover = {
  transition,
  text: cn("hover:opacity-80", transition),
  shadow: cn("hover:opacity-80 hover:drop-shadow-md", transition),
};
