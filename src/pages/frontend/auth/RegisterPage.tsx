import {Link, useNavigate} from "react-router-dom";
import HeaderComponent from "./HeaderComponent.tsx";
import InputComponent from "../../../components/formLayout/InputComponent.tsx";
import ButtonComponent from "../../../components/formLayout/ButtonComponent.tsx";
import authApi from "../../../api/AuthApi.ts";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleLoginUser} from "../../../utils/const.tsx";
import GoogleAuthComponent from "./GoogleAuthComponent.tsx";

const RegisterPage = () => {

    const {loading} = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const handleRegister = async (e: any) => {
        e.preventDefault();
        if (!loading) {
            const response: any = await authApi.register({email, password, name});
            if (response?.data?.success) {
                handleLoginUser(response.data, dispatch);
                navigate('/');
            }
        }
    }
    return (
        <>
            <HeaderComponent title={' Register to your account'}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <GoogleAuthComponent/>
                        <InputComponent
                            label={'Full Name'}
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            onInput={(e: any) => setName(e.target.value)}
                        />
                        <InputComponent
                            label={'Email address'}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            onInput={(e: any) => setEmail(e.target.value)}
                        />
                        <InputComponent
                            label={'Password'}
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="password"
                            onInput={(e: any) => setPassword(e.target.value)}
                        />
                        <ButtonComponent name={'Submit'} type="submit"/>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have account? {' '}
                        <Link to={'/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login now
                        </Link>
                    </p>
                </div>
            </HeaderComponent>


        </>
    )
}

export default RegisterPage;
