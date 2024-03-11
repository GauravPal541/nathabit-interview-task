import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegForm from "./common/reg-from";

const register = () => {


    return (
        <>

            <div className="loginwrapper"  style={{height:"100vh"}}>
                <div className="lg-inner-column h-full">
                    <div className="right-column h-full relative bg-white dark:bg-slate-800">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div style={{alignItems:"center"}} className="auth-box h-full flex flex-col justify-center">
                                <div className="mobile-logo text-center mb-6 lg:hidden block">
                                   
                                </div>
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <h4 className="font-medium">Sign in</h4>
                                    <div className="text-slate-500 text-base">
                                        Already Registered?  <Link style={{outline:"none", textDecoration:"none"}} to={"/"}>Log In</Link>
                                    </div>
                                </div>
                                <RegForm />
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default register;
