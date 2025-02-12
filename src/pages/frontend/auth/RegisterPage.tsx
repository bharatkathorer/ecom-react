import {Link, useNavigate} from "react-router-dom";
import GuestHeaderComponent from "../../../layouts/GuestHeaderComponent.tsx";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import authApi from "../../../api/frontend/AuthApi.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {handleLoginUser} from "../../../utils/const.tsx";
import GoogleAuthComponent from "./GoogleAuthComponent.tsx";
import {useFormik} from "formik";
import FormComponent from "../../../components/FormComponent.tsx";

const RegisterPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [error, setError] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false)

    const registerForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: () => handleRegister()
    })
    const handleRegister = async () => {
        setLoading(true);
        if (!loading) {
            const response: any = await authApi.register(registerForm.values);
            setError(response);
            if (response?.data?.success) {
                handleLoginUser(response.data, dispatch);
                navigate('/');
            }
        }
        setLoading(false);
    }
    return (
        <>
            <GuestHeaderComponent title={' Register to your account'}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <FormComponent onSubmit={() => registerForm.submitForm()} className="space-y-6">
                        <GoogleAuthComponent/>
                        <InputComponent
                            label={'Full Name'}
                            id="name"
                            name="name"
                            type="text"
                            errors={error}
                            autoComplete="name"
                            defaultValue={registerForm.values.name}
                            onInput={(e: any) => registerForm.setFieldValue('name', e.target.value)}
                        />
                        <InputComponent
                            label={'Email address'}
                            id="email"
                            name="email"
                            type="email"
                            errors={error}
                            autoComplete="email"
                            defaultValue={registerForm.values.email}
                            onInput={(e: any) => registerForm.setFieldValue('email', e.target.value)}
                        />
                        <InputComponent
                            label={'Password'}
                            id="password"
                            name="password"
                            type="password"
                            errors={error}
                            autoComplete="password"
                            defaultValue={registerForm.values.password}
                            onInput={(e: any) => registerForm.setFieldValue('password', e.target.value)}
                        />
                        <ButtonComponent loading={loading} disabled={loading} name={'Submit'} type="submit"/>
                    </FormComponent>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have account? {' '}
                        <Link to={'/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login now
                        </Link>
                    </p>
                </div>
            </GuestHeaderComponent>


        </>
    )
}

export default RegisterPage;
