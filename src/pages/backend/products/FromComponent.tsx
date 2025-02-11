import {useNavigate} from "react-router-dom";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import {ReactNode} from "react";

type  Props = {
    title?: string,
    description?: string,
    backAction?: string,
    buttonName?: string,
    loading?: boolean,
    disable?: boolean,
    onSubmit?: () => void,
    children?: ReactNode,
}
export default function FromComponent({
                                    title,
                                    description,
                                    backAction,
                                    buttonName = 'Submit',
                                    onSubmit,
                                    loading,
                                    disable,
                                    children
                                }: Props) {
    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit && onSubmit();
    }
    const handleBackAction = () => {
        if (backAction) {
            navigate(backAction);
        } else {
            navigate(-1);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base/7 font-semibold text-gray-900">{title}</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            {description}
                        </p>
                    </div>
                    <div className="grid  gap-x-6 gap-y-8 md:col-span-2">
                        {children}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={handleBackAction} type="button"
                        className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                    Cancel
                </button>
                <div>
                    <ButtonComponent type={'submit'}
                                     disabled={disable}
                                     loading={loading}
                                     name={buttonName}/>
                </div>
            </div>
        </form>
    )
}
