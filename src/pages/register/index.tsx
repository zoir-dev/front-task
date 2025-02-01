import { useRequest } from "@/hooks/useRequest";
import { Card, message } from "antd";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const { post, isPending } = useRequest();

    const navigate = useNavigate();

    async function onFinish(values: FieldType) {
        await post("auths/sign-up", values);
        message.success("Успешная регистрация");
        navigate("/auth/login");
    }
    return (
        <Card
            title="Регистрация"
            className="w-full max-w-[462px] p-6"
            classNames={{
                title: "text-2xl sm:text-3xl md:text-4xl pt-4 sm:pt-6",
                body: "p-4 sm:p-6 !pb-2",
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
                    label="Ф.И.О"
                    name="fullname"
                    className="w-full !rounded-xs"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите Ф.И.О",
                        },
                    ]}
                >
                    <Input
                        placeholder="Введите Ф.И.О"
                        className="!rounded-xs"
                        disabled={isPending}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Логин"
                    name="login"
                    className="w-full !rounded-xs [&>div]:!p-0"
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
                    <Link to={"/auth/login"} className="text-[#1890FF]">
                        Вход
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
                        Регистрировать
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

type FieldType = {
    fullname: string;
    login: string;
    password: string;
};
