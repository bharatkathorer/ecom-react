import {Link, useNavigate} from "react-router-dom";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import GuestHeaderComponent from "../../../layouts/GuestHeaderComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import {useState} from "react";
import {handleLoginAdmin} from "../../../utils/const.tsx";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import FormComponent from "../../../components/FormComponent.tsx";
import InputErrorComponent from "../../../components/InputErrorComponent.tsx";
import authApi from "../../../api/backend/AuthApi.ts";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>({});

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: () => handleLogin()
    })
    const handleLogin = async () => {
        setLoading(true)
        const resp: any = await authApi.login(loginForm.values);
        setError(resp);
        if (resp?.data?.success) {
            handleLoginAdmin(resp.data, dispatch);
            navigate('/admin');
        }
        setLoading(false)

    }
    return (
        <GuestHeaderComponent title={'Admin Login'}>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <FormComponent onSubmit={() => loginForm.submitForm()} className="space-y-6">

                    <InputComponent
                        onInput={(e: any) => loginForm.setFieldValue('email', e.target.value)}
                        defaultValue={loginForm.values.email}
                        label={'Email address'}
                        id="email"
                        name="email"
                        type="email"
                        errors={error}
                        autoComplete="email"
                    />
                    <div>
                        <InputComponent
                            onInput={(e: any) => loginForm.setFieldValue('password', e.target.value)}
                            defaultValue={loginForm.values.password}
                            label={'Password'}
                            id="password"
                            name="password"
                            type="password"
                            errors={error}
                            autoComplete="password"
                            suffix={<div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>}
                        />
                        <InputErrorComponent className={'mt-1'} response={error} errorType={'MAIN_ERROR'}/>
                    </div>

                    <ButtonComponent loading={loading} disabled={loading} name={'Login'} type="submit"/>
                </FormComponent>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Don't have account? {' '}
                    <Link to={'/register'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register now
                    </Link>
                </p>
            </div>
        </GuestHeaderComponent>
    )
}
export default LoginPage;
