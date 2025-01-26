export const BASE_URL: string = 'http://localhost:8000';

export const makeUrl = (url: string): string => {
    return `${BASE_URL}/${url}`;
}