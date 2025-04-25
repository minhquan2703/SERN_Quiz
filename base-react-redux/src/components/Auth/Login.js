import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { ImSpinner10 } from 'react-icons/im'
import { doLogin } from "../../redux/action/userAction";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ]= useState(false);
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

        setIsLoading(true);
        //submit api
        let data = await postLogin(email, password)
        if(data && data.EC === 0){
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')
        }
        if(data && data.EC !== 0){
            toast.error(data.EM)
            setIsLoading(false)
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
                    <button 
                        className="btn-submit"
                        onClick={() => handleLogin()}
                        disabled={isLoading}>
                        <span>Login to MinhQuan&#160;&#160;</span>
                        {isLoading &&<ImSpinner10 className="loader-icon"/>}
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
