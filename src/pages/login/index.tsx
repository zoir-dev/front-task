import { useRequest } from "@/hooks/useRequest";
import { Card, message } from "antd";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const { post, isPending } = useRequest();
    const navigate = useNavigate();

    async function onFinish(values: FieldType) {
        const res = await post("auths/sign-in", values);
        message.success("Успешный вход");
        localStorage.setItem("token", res as string);
        navigate("/");
    }

    return (
        <Card
            title="Вход"
            className="w-full max-w-[462px] p-6"
            classNames={{
                title: "text-2xl sm:text-3xl md:text-4xl pt-4 sm:pt-6",
                body: "p-4 sm:p-6 !pb-2 !pt-5",
                header: "!border-none",
            }}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark="optional"
            >
                <Form.Item<FieldType>
                    label="Логин"
                    name="login"
                    className="w-full !rounded-xs"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите логин",
                        },
                    ]}
                >
                    <Input
                        placeholder="Введите логин"
                        className="!rounded-xs"
                        disabled={isPending}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите пароль",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Введите пароль"
                        className="!rounded-xs"
                        disabled={isPending}
                    />
                </Form.Item>

                <div
                    className={`pb-2 ${
                        isPending && "pointer-events-none opacity-50"
                    }`}
                >
                    <Link to={"/auth/register"} className="text-[#1890FF]">
                        Регистрация
                    </Link>
                </div>

                <Form.Item
                    label={null}
                    className="w-full flex justify-center !mb-0 pt-2"
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="!bg-[#7CB305] hover:!bg-[#7CB305]/80 !rounded-xs"
                        loading={isPending}
                    >
                        Вход
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

type FieldType = {
    login: string;
    password?: string;
};
