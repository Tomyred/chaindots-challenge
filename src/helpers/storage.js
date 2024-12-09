const set = (key, value) => {
    localStorage.setItem(key, value);
};

const get = (key) => {
    const data = localStorage.getItem(key);
    return data;
};

const remove = (key) => {
    localStorage.removeItem(key);
};

const hasKey = (key) => {
    return localStorage.hasOwnProperty(key);
};

const getAllKeys = () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }
    return keys;
};

const clearAll = () => {
    localStorage.clear();
};

const storageManager = { set, get, remove, hasKey, getAllKeys, clearAll };

export default storageManager
