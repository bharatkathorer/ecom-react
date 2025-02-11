import ButtonComponent from "./formLayout/ButtonComponent.tsx";
import ModelComponent from "./ModelComponent.tsx";
import {ReactNode, useState} from "react";

type Props = {
    title?: string,
    description?: string,
    buttonTitle?: string,
    onResponse?: (item: any) => void,
    apiMethod?: () => Promise<any>;
    item?: any,
    children?: ReactNode,
}
const DeleteComponent = ({
                             title = "Delete product.",
                             description = "Are you sure delete this product",
                             onResponse,
                             apiMethod,
                             children,
                             buttonTitle = "Delete"
                         }: Props) => {
    const [deleteModel, openDeleteModel] =
        useState<boolean>(false)
    const [loading, setLoading] =
        useState<boolean>(false)
    const handleSubmit = async () => {
        if (!loading) {
            setLoading(true);
            if (apiMethod) {
                try {
                    const response: any = await apiMethod();
                    if (response.data.success) {
                        onResponse && onResponse(response);
                        openDeleteModel(false);
                    }
                    setLoading(false);

                } catch (error) {
                    setLoading(false);
                    console.error("Error in onResponse:", error);
                }
            } else {
                openDeleteModel(false);
                setLoading(false);
            }
        }
    }
    return <>
        <ModelComponent
            open={deleteModel}
            close={() => openDeleteModel(false)}>
            <div className="w-full">
                <h2 className="text-base/7 font-semibold text-red-600">
                    {title}
                </h2>
                <p
                    className="mt-1 text-sm/6 text-gray-600">
                    {description}
                    .</p>
                <div className="mt-6 flex w-full items-center justify-end gap-x-6">
                    <button type="button"
                            onClick={() => openDeleteModel(false)}
                            className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                        Cancel
                    </button>
                    <div>
                        <ButtonComponent type={'submit'}
                                         disabled={loading}
                                         loading={loading}
                                         onClick={() => handleSubmit()}
                                         name={"Delete"}/>
                    </div>
                </div>
            </div>
        </ModelComponent>
        {children ? children : (
            <div className="cursor-pointer text-red-600"
                 onClick={() => openDeleteModel(true)}
            >
                {buttonTitle}
            </div>
        )}
    </>
}
export default DeleteComponent;
