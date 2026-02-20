import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function dateFormatter(date: Date) {
    return new Date(date).toLocaleDateString();
}

export function truncateWords(text: string, maxWords: number = 7): string {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
        return text;
    }
    return `${words.slice(0, maxWords).join(' ')}...`;
}

export function camelCaseFormat(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
