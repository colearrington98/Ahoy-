// Desc: Custom hook to store data in local storage
import { useEffect, useState } from 'react';
// The PREFIX is used to prefix the key so that it is unique and does not conflict with other keys in local storage.
const PREFIX = 'AhoyChat-';
// The useLocalStorage hook is used to store data in local storage. It takes a key and an initial value as arguments and returns the value and a function to set the value.
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });
// The useEffect hook is used to update the value in local storage whenever the value changes.
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);
// The useLocalStorage hook returns the value and a function to set the value.
    return [value, setValue];
}