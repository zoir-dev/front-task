import ControlCompany from "@/components/control-company";
import { useGet } from "@/hooks/useGet";
import { TCompany } from "@/types/common";
import { Dropdown, message, Modal, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { items } from "./items";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/hooks/useStore";
import { useRequest } from "@/hooks/useRequest";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
    const { data, isFetching } = useGet<TCompany[]>("companies/get-all");

    const { setStore: setCurrent } = useStore("current-company");
    const { setStore: setOpen } = useStore("control-modal");
    const queryClient = useQueryClient();
    const { remove, isPending } = useRequest();
    const navigate = useNavigate();

    const { confirm } = Modal;

    function onClick(key: string, record: TCompany) {
        switch (key) {
            case "0":
                onView(record.id);
                break;
            case "1":
                onEdit(record);
                break;
            case "2":
                onDelete(record.id);
                break;
        }
    }

    function onView(id: TCompany["id"]) {
        navigate("/company/" + id);
    }

    function onEdit(current: TCompany) {
        setCurrent(current);
        setOpen(true);
    }

    async function onDelete(id: TCompany["id"]) {
        confirm({
            title: "Вы хотите удалить?",
            async onOk() {
                await remove(`companies/delete/by-id`, id);
                message.success("Компания успешно удалена");
                queryClient.setQueryData(
                    ["companies/get-all"],
                    (old: TCompany[]) => old?.filter((item) => item.id !== id)
                );
            },
        });
    }
    return (
        <>
            <Table
                columns={columns({ onClick })}
                dataSource={data?.map((item) => ({ ...item, key: item.id }))}
                loading={isFetching || isPending}
                bordered
            />
            <ControlCompany />
        </>
    );
}

const columns = ({
    onClick,
}: {
    onClick: (key: string, record: TCompany) => void;
}): ColumnType<TCompany>[] => {
    return [
        {
            title: "Название компании",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Количество сотрудников",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "",
            key: "id",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: items,
                        onClick: ({ key }) => onClick(key, record),
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis-vertical p-1"
                    >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </Dropdown>
            ),
        },
    ];
};
