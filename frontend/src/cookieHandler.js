import {jwtDecode} from 'jwt-decode';
import {useCookies , Cookies} from 'react-cookie'

const CookieHandler = () =>{
const[cookie,setCookie,removeCookie] = useCookies();

const cookies = new Cookies();

const SetCookie = (token) =>{
   setCookie("jwt",token,Date(Date.now()+(30*24*60*60*1000))) 
}

const GetCookieData = () =>{
    const token =  cookies.get("jwt")
    const data = jwtDecode(token)
    return data ;
}

const DeleteCookie = () =>{
   removeCookie("jwt")
}
 
 return { SetCookie , GetCookieData , DeleteCookie } ;
}

export default CookieHandler ;


