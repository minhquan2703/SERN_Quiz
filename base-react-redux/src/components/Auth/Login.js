import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  };
    const handleLogin = async() => {
        //validate
		const isValidEmail = validateEmail(email)
		if(!isValidEmail){
			toast.error("Invalid email")
			return;
		}

		if(!password){
			toast.error("Invalid password")
			return;
		}
        //submit api
        let data = await postLogin(email, password)
        if(data && data.EC === 0){
            toast.success(data.EM)
            navigate('/')
        }
        if(data && data.EC !== 0){
            toast.error(data.EM)
        }    
    };
    return (
        <div className="login-container">
            <div className="header">
                <span>Dont have account yet?</span>
                <button onClick={()=> navigate('/signup')}>Sign Up</button>
            </div>
            <div className="title col-3 mx-auto">MinhQuan</div>
            <div className="welcome col-3 mx-auto">hello, who r u?</div>
            <div className="context-form col-3 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span>Forgot password?</span>
                <div>
                    <button onClick={() => handleLogin()}>
                        Login to MinhQuan
                    </button>
                </div>
                <div className="text-center">
                    <span
                        onClick={() => {navigate("/");}}
                        className='back'
                    >
                        &#60;&#60; Go to HomePage
                    </span>
                </div>
            </div>
        </div>
    );
};
export default Login;
