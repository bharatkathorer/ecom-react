import {Link, useNavigate} from "react-router-dom";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import GuestHeaderComponent from "../../../layouts/GuestHeaderComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import authApi from "../../../api/frontend/AuthApi.ts";
import {useState} from "react";
import {handleLoginUser} from "../../../utils/const.tsx";
import {useDispatch} from "react-redux";
import GoogleAuthComponent from "./GoogleAuthComponent.tsx";
import {useFormik} from "formik";
import FormComponent from "../../../components/FormComponent.tsx";
import InputErrorComponent from "../../../components/InputErrorComponent.tsx";

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
        setLoading(true);
        const resp: any = await authApi.login(loginForm.values);
        setError(resp);
        if (resp?.data?.success) {
            handleLoginUser(resp.data, dispatch);
            navigate('/');
        }
        setLoading(false)
    }


    return (
        <GuestHeaderComponent>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <FormComponent onSubmit={() => loginForm.submitForm()} className="space-y-6">
                    <GoogleAuthComponent/>
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
