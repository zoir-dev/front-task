import Header from "@/components/header";
import { useUser } from "@/constants/useUser";
import { Spin } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
    const { login, isFetching } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!login?.toString() && !isFetching) {
            navigate("/auth/login");
        }
    }, [login, isFetching, navigate]);
    return (
        <>
            {isFetching && (
                <div className="fixed top-0 w-full h-screen grid place-items-center bg-black/80 z-50">
                    <Spin size="large" />
                </div>
            )}
            <Header />
            <main className="px-4 pt-4">
                <Outlet />
            </main>
        </>
    );
}
