import AuthLayout from "../../../layouts/backend/AuthLayout.tsx";
import FormComponent from "../../../components/FormComponent.tsx";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import FileInput from "../../../components/formLayout/FileInput.tsx";
import {useFormik} from "formik";
import productsApi from "../../../api/backend/productsApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {makeUrl} from "../../../utils/const.tsx";

const CreateProductPage = () => {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>({});


    useEffect(() => {
        loadProduct();
    }, []);
    const loadProduct = async () => {
        if (productId) {
            const {data}: any = await productsApi.find(productId);
            if (data.success) {
                const _data: any = {
                    title: data.title,
                    grass_price: data.grass_price,
                    net_price: data.net_price,
                    discount: data.discount,
                    description: data.description,
                    preview_product_image: data.product_image,
                };
                await form.setValues(_data);
            }
        }
    }
    const form = useFormik({
        initialValues: {
            title: '',
            grass_price: '',
            net_price: '',
            discount: '',
            description: '',
            product_image: '',
            preview_product_image: '',
        },
        onSubmit: () => productId ? handleUpdate() : handleSubmit(),
    });
    const handleSubmit = async () => {
        setLoading(true);
        const response: any = await productsApi.store(form.values);
        setError(response);
        if (response?.data?.success) {
            navigate(-1);
        }
        setLoading(false);
    }
    const handleUpdate = async () => {
        setLoading(true);
        const response: any = await productsApi.update(productId, form.values);
        setError(response);
        if (response?.data?.success) {
            navigate(-1);
        }
        setLoading(false);
    }

    const handleSelectFile = (file: any) => {
        form.setFieldValue('product_image', file);
    }

    return <AuthLayout>
        <FormComponent
            isEmptyForm={false}
            loading={loading}
            disable={loading}
            onSubmit={form.submitForm}
            buttonName={productId ? "Update" : "Save"}
            title="Create Product"
            description="We'll always let you know about important changes, but you pick what else you want to hear about."
        >
            <div
                className="col-span-2">
                <FileInput
                    defaultValue={makeUrl(form.values.preview_product_image)}
                    onSelect={handleSelectFile}
                    label={'Product Image'}
                    name='product_image'

                errors={error}
                />
            </div>
            <InputComponent
                onInput={(event: any) => form.setFieldValue('title', event.target.value)}
                defaultValue={form.values.title}
                label={'Product name'}
                errors={error}
                name='title'
            />
            <InputComponent
                onInput={(event: any) => form.setFieldValue('grass_price', event.target.value)}
                defaultValue={form.values.grass_price}
                type="number"
                errors={error}
                label={'grass price'}
                name='grass_price'
            />
            <InputComponent
                onInput={(event: any) => form.setFieldValue('net_price', event.target.value)}
                defaultValue={form.values.net_price}
                type="number"
                errors={error}
                label={'net price'}
                name='net_price'
            />
            <InputComponent
                onInput={(event: any) => form.setFieldValue('discount', event.target.value)}
                defaultValue={form.values.discount}
                type="number"
                label={'discount'}
                name='discount'
                errors={error}
            />
            <div
                className="col-span-2">
                <InputComponent
                    onInput={(event: any) => form.setFieldValue('description', event.target.value)}
                    defaultValue={form.values.description}
                    label={'description'}
                    textarea={true}
                    errors={error}
                    name='description'
                />
            </div>

        </FormComponent>
    </AuthLayout>
}

export default CreateProductPage;
