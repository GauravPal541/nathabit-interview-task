import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegistrationMutation } from "../../../../api/api";

const schema = yup
    .object({
        firstName: yup.string().required("First Name is Required"),
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is Required"),
        password: yup
            .string()
            .min(6, "Password must be at least 8 characters")
            .max(20, "Password shouldn't be more than 20 characters")
            .required("Please enter password"),
        // confirm password
        confirm: yup
            .string()
            .min(6, "Password must be at least 8 characters")
            .max(20, "Password shouldn't be more than 20 characters")
            .oneOf(
                [yup.ref("password"), null],
                "Confirm password must match with password."
            ),
    })
    .required();

const RegForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const [registerUser, { error }] = useRegistrationMutation();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValue(e.target.name, e.target.value || "");
    };

    useEffect(() => {
        toast.error(error?.data?.message, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, [error]);

    const onSubmit = async (data) => {
        try {
            const finalData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data?.email,
                password: data?.password,
            };
            console.log(finalData);
            const res = await registerUser(finalData);

            if (res?.data) {
                toast.success("Registration successfull", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
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
                    id="outlined-first-input"
                    label="First Name"
                    type="text"
                    {...register("firstName")}
                />
                {errors.firstName?.message && (
                    <p style={{ color: "red" }}>{errors.firstName?.message}</p>
                )}
                <TextField
                    id="outlined-last-input"
                    label="Last Name"
                    type="text"
                    {...register("lastName")}
                />
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
                <TextField
                    id="outlined-confirm-input"
                    label="Confirm Password"
                    type="password"
                    {...register("confirm")}
                />
                {errors.confirm?.message && (
                    <p style={{ color: "red" }}>{errors.confirm?.message}</p>
                )}
                <button className="btn btn-primary" type="submit">
                    Create an Account
                </button>
            </Box>
        </form>
    );
};

export default RegForm;
