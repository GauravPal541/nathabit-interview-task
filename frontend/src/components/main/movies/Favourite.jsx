import React, { useEffect, useState } from "react";
import Card from "../../layout/Card";
import { useLikeMutation, useGetFavouriteQuery } from "../../../api/api";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Pagination from "../../layout/Pagination";
import { toast } from "react-toastify";


function Favourite() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [totalPages, setTotalPages] = useState(null);

    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);

    const { data, error } = useGetFavouriteQuery({
        limit,
        offset,
        ...(userInfo ? { userId: JSON.parse(userInfo)?.userId } : {}),
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setOffset((page - 1) * limit);
    };

    const [like, { error: err2 }] = useLikeMutation();



    const handleLike = async (movieId) => {
        try {
            const res = await like({
                ...(userInfo ? { userId: JSON.parse(userInfo)?.userId } : {}),
                movieId: movieId,
            });

            toast.success("Liked", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.log(res);
        } catch (error) {}
    };

    useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data?.count / limit));
        }
    }, [data]);

    return (
        <>
            <div style={{ display: "flex", flexWrap: "wrap", width: "100vw" }}>
                {data?.rows?.map((item, index) => {
                    return (
                        <div
                            key={index.toString()}
                            style={{ width: "25%", margin: "5px" }}
                        >
                            <Card bodyClass="p-0">
                                <div className="h-[250px] w-full">
                                    <img
                                        src={item?.Poster}
                                        alt=""
                                        className="block w-full h-full object-cover rounded-t-md"
                                    />
                                </div>
                                <div className="p-6">
                                    <header className="mb-8">
                                        <div className="card-title">
                                            {item?.Title}
                                        </div>
                                    </header>
                                    <div className="text-sm">
                                        Release Year - {item?.Year}
                                    </div>
                                    <div className="text-sm">
                                        Total Likes - {item?.likes}
                                    </div>
                                    <div className="mt-6 space-x-4 rtl:space-x-reverse">
                                        <Button
                                            disabled={item?.liked}
                                            variant="contained"
                                            onClick={() =>
                                                handleLike(item?.id)
                                            }
                                        >
                                            Like
                                        </Button>
                                        {/* <Button
                                            disabled={item?.favourite}
                                            onClick={() =>
                                                handleFavourite(item?.id)
                                            }
                                            variant="contained"
                                        >
                                            Mark As Favourite
                                        </Button> */}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div>
            <div
                className="mt-10"
                style={{
                    width: "100vw",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
            </div>
        </>
    );
}

export default Favourite;
