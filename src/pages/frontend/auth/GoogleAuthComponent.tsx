import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const GoogleAuthComponent = () => {
    return <GoogleOAuthProvider
        clientId="106031984985-sch5sp78g92ktr3l85e6madcaec6cvb5.apps.googleusercontent.com">
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    </GoogleOAuthProvider>;
}

export default GoogleAuthComponent;
