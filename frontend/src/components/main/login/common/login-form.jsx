import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../../api/api";
import { handleLogin } from "../../../../store/slices/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is Required"),
        password: yup.string().required("Password is Required"),
    })
    .required();

const LoginForm = () => {
    const dispatch = useDispatch();
    const [login, { error }] = useLoginMutation();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        //
        mode: "all",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(
                error?.data?.message.includes("Not Found")
                    ? "Please register first"
                    : error?.data?.message,
                {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }
    }, [error]);

    const onSubmit = async (data) => {
        const res = await login({ data });
        console.log(data)
        if (res.data) {
            const data = {
                isAuth: true,
                data: res.data,
            };
            dispatch(handleLogin(data));
            setTimeout(() => {
                navigate("/app");
            }, 1500);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Box
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                autoComplete="off"
            >
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="text"
                    {...register("email")}
                />
                {errors.email?.message && (
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                )}
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    {...register("password")}
                    autoComplete="current-password"
                />
                {errors.password?.message && (
                    <p style={{ color: "red" }}>{errors.password?.message}</p>
                )}
                 <button className="btn btn-primary" type="submit">
                Log In
            </button>
            </Box>
           
        </form>
    );
};

export default LoginForm;
