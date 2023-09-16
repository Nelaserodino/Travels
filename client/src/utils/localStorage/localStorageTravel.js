export const localStorageTravel = () => {
    const token = window.localStorage.getItem('token');
    return token;
}

export const saveLocalStorageTravel = (item) => {
    window.localStorage.setItem('token', item);
    return true;
}

export const delLocalStorageTravel = () => {
    window.localStorage.removeItem('token');
}