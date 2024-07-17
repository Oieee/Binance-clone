import React, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

const GoogleAuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const responseGoogle = (response: any) => {
    console.log(response);
    setUser(response.profileObj);
    setIsLoggedIn(true);
    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem("user", JSON.stringify(response.profileObj));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // Xóa thông tin người dùng từ localStorage
    localStorage.removeItem("user");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user?.name}</h2>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default GoogleAuthButton;
