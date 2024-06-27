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

export const validateEmail = (email) =>{
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}