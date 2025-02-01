import { useUser } from "@/constants/useUser";
import { useStore } from "@/hooks/useStore";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { setStore } = useStore<boolean>("control-modal");
    const { setStore: setCurrent } = useStore("current-company");
    const { remove } = useUser();
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("token");
        navigate("/auth/login");
        remove();
    }
    return (
        <header className="bg-[#313131] p-4 w-full flex items-center justify-between">
            <h3 className="font-bold text-white">Компании</h3>
            <div className="flex items-center gap-4">
                <Button
                    onClick={logOut}
                    className="!bg-transparent !border-none !text-white"
                    variant="text"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-circle-arrow-out-down-left rotate-45"
                        >
                            <path d="M2 12a10 10 0 1 1 10 10" />
                            <path d="m2 22 10-10" />
                            <path d="M8 22H2v-6" />
                        </svg>
                    }
                />
                <Button
                    color="cyan"
                    variant="solid"
                    onClick={() => {
                        setStore(true);
                        setCurrent({});
                    }}
                >
                    Добавить компанию
                </Button>
            </div>
        </header>
    );
}
