import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatFileSize = (bytes: number) => {
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

export const generateCode = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};
