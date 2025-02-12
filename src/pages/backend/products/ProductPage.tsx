import AuthLayout from "../../../layouts/backend/AuthLayout.tsx";
import TableComponent from "../../../components/formLayout/TableComponent.tsx";
import {useEffect, useState} from "react";
import productsApi from "../../../api/backend/productsApi.ts";
import {formatDate, makeUrl} from "../../../utils/const.tsx";
import {useSearchParams} from "react-router-dom";
import DeleteComponent from "../../../components/DeleteComponent.tsx";
import LinkComponent from "../../../components/LinkComponent.tsx";

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1; // Default to page 1
    const fields = [
        {key: 'product_image', label: "Image"},
        {key: 'title', label: "Name"},
        {key: 'net_price', label: "net price"},
        {key: 'grass_price', label: "grass price"},
        {key: 'discount', label: "discount"},
        {key: 'created_at', label: "created_at"},
        {key: 'actions', label: "actions"},
    ];
    const [products, setProducts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        loadProducts().then();
    }, [page]);


    const onResponse = (response: any) => {
        if (response.data.success) {
            loadProducts().then();
            return false;
        }
        return true;
    }

    const loadProducts = async () => {
        setLoading(true);
        const response: any = await productsApi.index(page);
        if (response?.data?.success) {
            setProducts(response.data);
        }
        setLoading(false);
    }
    const handleRowValue = (key: any, value: any) => {
        switch (key) {
            case "net_price":
                return `₹${value[key]}`;
            case "created_at":
                return formatDate(value[key]);
            case "grass_price":
                return `₹${value[key]}`;
            case "discount":
                return `₹${value[key]}`;
            case "actions":
                return <div className="flex space-x-2">
                    <LinkComponent
                        href={`/admin/products/${value.id}`}
                        title={"Edit"}
                    />
                    <DeleteComponent apiMethod={() => productsApi.delete(value.id)}
                                     onResponse={onResponse}/>
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
            loading={loading}
            title="Products"
            fields={fields}
            options={products}
            dataKey={'data'}
            renderSlot={handleRowValue}
            actionData={{
                title: 'Create product',
                href: '/admin/products/create'
            }}
        />
    </AuthLayout>
}
export default ProductPage;
