export const truncate = (obj: any, length = 200): string => {
    const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
    return str.length > length ? str.substring(0, length) + '...' : str;
};
