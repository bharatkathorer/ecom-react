type Props = {
    response: any,
    errorType?: 'MAIN_ERROR' | 'INPUT_ERROR',
    name?: string,
    className?: string,
}
const InputErrorComponent = ({response, errorType = "INPUT_ERROR", name, className}: Props) => {
    if (response?.data?.success !== false) {
        return null;
    }
    const errors: any = response?.data?.errors.filter((item: any) => item.path == name);
    const message: any = response?.data?.message;
    return <div className={className}>
        {
            errorType === 'MAIN_ERROR' ? <>{
                message &&
                <p className={'text-red-600 text-sm'}>{message}</p>
            }
            </> : (<>
                {
                    errors.map((item: any) => (
                        <p className={'text-red-600 text-sm'}>
                            {item.msg}
                        </p>
                    ))
                }
            </>)
        }

    </div>
}
export default InputErrorComponent;
