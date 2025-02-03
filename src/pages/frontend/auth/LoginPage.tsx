import {Link, useNavigate} from "react-router-dom";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import HeaderComponent from "./HeaderComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import authApi from "../../../api/AuthApi.ts";
import {useState} from "react";
import {handleLoginUser} from "../../../utils/const.tsx";
import {useDispatch} from "react-redux";
import GoogleAuthComponent from "./GoogleAuthComponent.tsx";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleLogin = async (e: any) => {
        e.preventDefault();
        const resp: any = await authApi.login({email, password});
        if (resp?.data?.success) {
            handleLoginUser(resp.data, dispatch);
            navigate('/');
        }
    }

    return (
        <HeaderComponent>
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
        </HeaderComponent>
    )
}
export default LoginPage;
