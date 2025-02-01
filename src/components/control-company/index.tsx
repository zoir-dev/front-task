import { Button, Form, Input, message, Modal } from "antd";
import { useStore } from "@/hooks/useStore";
import { useRequest } from "@/hooks/useRequest";
import { useQueryClient } from "@tanstack/react-query";
import { TCompany } from "@/types/common";

export default function ControlCompany() {
    const { store: open, setStore: setOpen } =
        useStore<boolean>("control-modal");
    const { store: current, clear } = useStore<TCompany | undefined>(
        "current-company"
    );

    const queryClient = useQueryClient();

    const { post, put, isPending } = useRequest();

    async function onFinish(values: FieldType) {
        if (current?.id) {
            await put(`companies/update`, { ...values, id: current?.id });
            message.success("Компания успешно обновлена");
            queryClient.setQueryData(["companies/get-all"], (old: TCompany[]) =>
                old?.map((item) =>
                    item.id === current?.id ? { ...item, ...values } : item
                )
            );
        } else {
            await post("companies/add", values);
            queryClient.invalidateQueries({ queryKey: ["companies/get-all"] });
            message.success("Компания успешно создана");
        }

        setOpen(false);
        clear();
    }

    return (
        <Modal
            title="Добавить компанию"
            open={open}
            onCancel={() => {
                setOpen(false);
                clear();
            }}
            footer={null}
            classNames={{
                body: "!pt-6",
            }}
            width={572}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout="horizontal"
                requiredMark="optional"
                initialValues={current?.id ? { ...current } : undefined}
                key={current?.id}
            >
                <Form.Item<FieldType>
                    label="Название компании"
                    name="name"
                    className="w-full !rounded-xs [&>div]:!p-0"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите название компании",
                        },
                    ]}
                >
                    <Input
                        placeholder="Введите название компании"
                        className="!rounded-xs"
                        disabled={isPending}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Количество сотрудников"
                    name="count"
                    rules={[
                        {
                            required: true,
                            message:
                                "Пожалуйста, введите количество сотрудников",
                        },
                        {
                            pattern: /^\d+$/,
                            message:
                                "Пожалуйста, введите количество сотрудников",
                        },
                    ]}
                >
                    <Input
                        placeholder="Введите количество сотрудников"
                        className="!rounded-xs"
                        disabled={isPending}
                    />
                </Form.Item>

                <Form.Item
                    label={null}
                    className="w-full flex justify-center !mb-0 pt-2"
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                    >
                        {current?.id?.toString()
                            ? "Обновить компанию"
                            : "Добавить компанию"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

type FieldType = {
    name: string;
    count: string;
};
