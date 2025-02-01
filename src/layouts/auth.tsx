import { useUser } from "@/constants/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
    const { login, isFetching } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (login?.toString() && !isFetching) {
            navigate("/");
        }
    }, [login, isFetching, navigate]);
    return (
        <main className="h-screen w-full bg-[url(https://blog.fentress.com/hubfs/Effective%20Office%20Layouts%20052815.jpeg)] bg-cover">
            <div className="h-screen w-full bg-[#000000B2] grid place-items-center">
                <Outlet />
            </div>
        </main>
    );
}
