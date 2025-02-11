import {Link, useNavigate} from "react-router-dom";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import authApi from "../../../api/backend/AuthApi.ts";
import {useState} from "react";
import {handleLoginAdmin} from "../../../utils/const.tsx";
import {useDispatch} from "react-redux";
import GuestHeaderComponent from "../../../layouts/GuestHeaderComponent.tsx";
import GoogleAuthComponent from "../../frontend/auth/GoogleAuthComponent.tsx";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleLogin = async (e: any) => {
        e.preventDefault();
        const resp: any = await authApi.login({email, password});
        if (resp?.data?.success) {
            handleLoginAdmin(resp.data, dispatch);
            navigate('/admin');
        }
    }

    return (
        <GuestHeaderComponent>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form onSubmit={handleLogin} className="space-y-6">
                    <GoogleAuthComponent/>
                    <InputComponent
                        onInput={(e: any) => {
                            setEmail(e.target.value);
                        }}
                        label={'Email address'}
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                    />
                    <InputComponent
                        onInput={(e: any) => {
                            setPassword(e.target.value);
                        }}
                        label={'Password'}
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                        suffix={<div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>}
                    />
                    <ButtonComponent name={'Submit'} type="submit"/>
                </form>

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
