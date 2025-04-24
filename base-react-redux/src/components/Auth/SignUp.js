import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './SignUp.scss';
import { useState } from "react";
import { postRegister } from "../../services/apiService";
import { VscEye, VscEyeClosed } from "react-icons/vsc"
const SignUp = (props) => {
    const navigate = useNavigate()
    const [ password, setPassword ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ isShowPassword, setIsShowPassword ] = useState(false) 
    
    const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  };
    const handleSignup = async() => {
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
        
        let data = await postRegister(email, username, password)
        if(data && data.EC === 0){
            toast.success(data.EM)
            navigate('/login')
        }
        if(data && data.EC !== 0){
            toast.error(data.EM)
        }    
    };
    return (
        <div className="signup-container">
            <div className="signup-header">
                <span>Already have an account?</span>
                <button onClick={()=> navigate('/login')}>Login</button>
            </div>
            <div className="signup-title col-3 mx-auto">Welcome to my website</div>
            <div className="signup-text col-4 mx-auto">Get better data with conversational forms, surveys, quizzes & more.</div>
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
                    <label>Username</label>
                    <input
                        className="form-control"
                        value={username}
                        onChange={(event)=> setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group pass-group">
                    <label>Password</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isShowPassword ?
                        <span className="icons-eye"
                        onClick={()=>setIsShowPassword(false)}
                        >
                            <VscEye/>
                        </span>
                        :
                        <span className="icons-eye"
                        onClick={()=>setIsShowPassword(true)}
                        >  
                            <VscEyeClosed/>
                        </span>
                    }
                </div>
                <div>
                    <button
                    onClick={()=>handleSignup()}
                    >Create your account</button>
                </div>
            </div>
        </div>
    );
};
export default SignUp;
