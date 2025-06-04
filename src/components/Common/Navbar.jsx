import React, { useCallback } from 'react'
import { navMenus } from '../../utils/menuList'
import { Link, useLocation } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/slices/authSlice';


const Navbar = () => {
    const path = useLocation();


    const user = useSelector(state => state.auth.authData);
    const { name } = user || {};

    const dispatch = useDispatch(); // useispatch 선언 : 리덕스 스토어에 접근, 리듀서 활용하기 위해 사용

    const handleLoginSuccess = useCallback((credentialResponse) => { // 이건 무슨 Hook이지? useEffect화 비슷한 역할인듯 한데... 뭔 차이임?
        try {
            console.log("Google Login Success ... ");
            const decoded = jwtDecode(credentialResponse.credential);
            dispatch(login(decoded));
        } catch (error) {
            console.log("Google Login Success Error. to Failed : ", error);
        }
    }, [dispatch]); // 디스패치가 실행되는 순간

    
    const handleLoginError = useCallback((error) => {
        console.log("Google Login Failed : ", error);
    }, [dispatch]);


    return (
        <nav className="navbar bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
            <div className="logo-wrapper flex w-full justify-center items-center gap-8">
                <div className="logo"></div>
                <h2 className="font-semibold text-xl">
                    <Link to="/">TODO</Link>
                </h2>
            </div>
            <ul className="menus">
                {
                    navMenus.map((menu, idx) => (
                        <li key={idx} 
                            className={`menu-item rounded-sm mb-1 border border-gray-700 hover:bg-gray-950 transition-all duration-300 cursor-pointer 
                            ${path.pathname === menu.to ? 'bg-gray-950' : ''}`}>
                            <Link to={menu.to} className="flex items-center gap-x-4 py-2 px-10">
                                {menu.icon} {menu.label}
                            </Link>
                        </li>        
                    ))
                }
            </ul>

            {
                user ? (
                    <div className="auth-wrapper flex justify-center w-4/5">
                        <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full" onClick={() => dispatch(logout())}>
                            <FcGoogle className="w-5 h-5"/> {/* 구글 아이콘 */}
                            <span className="text-sm">"{name}"님 lOgOuT</span>
                        </button>
                    </div>
                ) : (
                    <div className="auth-wrapper flex justify-center w-4/5 login-btn">
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_CLIENT_ID}>
                            <GoogleLogin 
                                onSuccess={credentialResponse => handleLoginSuccess(credentialResponse)}
                                onError={() => handleLoginError()}/>
                            <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full">
                                <FcGoogle className="w-5 h-5"/> {/* 구글 아이콘 */}
                                <span>GoOgLe lOgIn</span>
                            </button>
                        </GoogleOAuthProvider>
                    </div>
                )
            }

           
        </nav>
    )
}

export default Navbar
