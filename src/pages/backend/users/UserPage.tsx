import AuthLayout from "../../../layouts/backend/AuthLayout.tsx";
import {useEffect, useState} from "react";
import userApi from "../../../api/backend/userApi.ts";
import TableComponent from "../../../components/formLayout/TableComponent.tsx";
import {formatDate} from "../../../utils/const.tsx";
import {useSearchParams} from "react-router-dom";

const UserPage = () => {

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1; // Default to page 1
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<any>([])

    useEffect(() => {
        loadUsers().then();
    }, [page]);
    const loadUsers = async () => {
        setLoading(true);
        const response: any = await userApi.index(page);
        if (response.data.success) {
            setUsers(response.data);
        }
        setLoading(false);
    }
    const fields = [
        {key: 'name', label: "Name"},
        {key: 'email', label: "Email"},
        {key: 'cart_items', label: "In cart"},
        {key: 'order_items', label: "Total Order"},
        {key: 'created_at', label: "created_at"},
    ];
    const handleRowValue = (key: any, value: any) => {
        switch (key) {
            case "created_at":
                return formatDate(value[key]);
            default:
                return value[key];
        }
    }
    return <AuthLayout>
        <TableComponent
            loading={loading}
            title="Orders"
            fields={fields}
            options={users}
            renderSlot={handleRowValue}
        />
    </AuthLayout>
}
export default UserPage;
