import Cookies from 'js-cookie';

export const getCookies = (key) => {

    if(!key) return null;

    const cookie = Cookies.get(key);

    if(cookie){
        try {
            const parsedData = JSON.parse(cookie);
            return parsedData;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    return null;
}