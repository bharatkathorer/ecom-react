import {InputHTMLAttributes, ReactElement, useState} from "react";
import InputErrorComponent from "../InputErrorComponent.tsx";

type Props = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    label?: string;
    suffix?: ReactElement,
    textarea?: boolean,
    value?: any,
    onSelect?: (file: any) => void,
    name?: string,
    errors?: any,
};
const FileInput = ({onSelect, label, name, errors, suffix, value, ...props}: Props) => {
    const [fileBlob, setFile] = useState<any>(null);
    const handleSelectFile = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file); // Create a temporary URL
            setFile(url);
        }
        onSelect && onSelect(file ?? null)
    }
    return <>
        <div>
            {
                (label || suffix) &&
                <div className="flex items-center justify-between">
                    <label htmlFor={props?.id ?? '_file_id'}
                           className="block text-sm/6 font-medium text-gray-900 capitalize">
                        {label}
                    </label>
                    {suffix}
                </div>
            }
            <div className="mt-2 flex  gap-x-3">
                <input
                    onInput={handleSelectFile}
                    className="block w-full text-sm text-gray-900 border
                     border-gray-300 rounded-lg cursor-pointer bg-gray-50
                     dark:text-gray-400 focus:outline-none dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400"
                    hidden
                    aria-describedby="file_input_help"
                    id={props?.id ?? '_file_id'} type="file"/>
                <div>
                    <label htmlFor={props?.id ?? '_file_id'}
                           className="rounded-md bg-white px-2.5 py-1.5
                       text-sm font-semibold text-gray-900 ring-1 shadow-xs
                       ring-gray-300 ring-inset hover:bg-gray-50">Select File
                    </label>
                </div>
                {(fileBlob || props.defaultValue) &&
                    <img src={fileBlob ?? props.defaultValue} alt={'file'} className="h-20"/>
                }
            </div>
            {
                name && <InputErrorComponent className={'mt-1'} response={errors} name={name}/>
            }
        </div>
    </>
}

export default FileInput;
