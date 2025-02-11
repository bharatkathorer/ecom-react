import AuthLayout from "../../../layouts/backend/AuthLayout.tsx";
import TableComponent from "../../../components/formLayout/TableComponent.tsx";
import {useEffect, useState} from "react";
import {formatDate, makeUrl, orderStatus} from "../../../utils/const.tsx";
import {useSearchParams} from "react-router-dom";
import orderApi from "../../../api/backend/orderApi.ts";
import LinkComponent from "../../../components/LinkComponent.tsx";

const OrderPage = () => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1; // Default to page 1
    const fields = [
        {key: 'product_image', label: "Image"},
        {key: 'title', label: "Product"},
        {key: 'user_name', label: "User"},
        // {key: 'user_email', label: "Email"},
        {key: 'order_net_price', label: "price"},
        // {key: 'order_grass_price', label: "grass price"},
        // {key: 'order_net_price', label: "discount"},
        {key: 'order_created_at', label: "order_created_at"},
        {key: 'status', label: "status"},
        {key: 'actions', label: "actions"},
    ];
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        loadProducts().then();
    }, [page]);


    const loadProducts = async () => {
        const response: any = await orderApi.index(page);
        if (response?.data?.success) {
            setOrders(response.data);
        }
    }
    const handleRowValue = (key: any, value: any) => {
        switch (key) {
            case "order_discount":
                return `₹${value[key]}`;
            case "order_created_at":
                return formatDate(value[key]);
            case "order_grass_price":
                return `₹${value[key]}`;
            case "order_net_price":
                return `₹${value[key]}`;
            case "status":
                return orderStatus(value[key]);
            case "actions":
                return <div className="flex space-x-2">
                    <LinkComponent
                        href={`/admin/orders/${value.order_id}`}
                        title={"Manage order"}
                    />
                </div>;
            case "product_image":
                return <img
                    src={makeUrl(value.product_image)}
                    alt={value.slug}
                    className="h-20 w-20 rounded"
                />
            default:
                return value[key];
        }
    }


    return <AuthLayout>
        <TableComponent
            title="Orders"
            fields={fields}
            options={orders}
            dataKey={'orders'}
            renderSlot={handleRowValue}
        />
    </AuthLayout>
}
export default OrderPage;
