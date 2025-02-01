import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const AuthLayout = lazy(() => import("./layouts/auth"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

const MainLayout = lazy(() => import("./layouts/main"));
const Home = lazy(() => import("./pages/home"));

export const routes: RouteObject[] = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
];
