import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="loginwrapper" style={{height:"100vh"}}>
                <div className="lg-inner-column h-full">
                    <div className="right-column h-full relative">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div style={{alignItems:"center"}} className="auth-box h-full flex flex-col justify-center">
                                <div className="mobile-logo text-center mb-6 block"></div>
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <h4 className="font-medium">Sign in</h4>
                                    <div className="text-slate-500 text-base">
                                        Don't have an account? <Link style={{outline:"none", textDecoration:"none"}} to={"/register"}>Register Now</Link>
                                    </div>
                                </div>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
