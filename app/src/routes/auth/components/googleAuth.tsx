import React from 'react'
import GoogleLogin from 'react-google-login';
import env from "react-dotenv";

const GoogleAuth = ({handleGoogleLogin}):JSX.Element => {
      return (
            <div style={{marginTop:"10px"}}>
                <GoogleLogin
                    clientId={env.CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
      )
}

export default GoogleAuth