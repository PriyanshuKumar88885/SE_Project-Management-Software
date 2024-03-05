import React, { useState } from "react";
import {  useNavigate } from "@reach/router";
import Axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';


const Email = () => {
    const [spiner,setSpiner] = useState(false);

    // const navigate = useNavigate();



    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            // toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            // toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email
            }

            // const response = await sentOtpFunction(data);

            // if (response.status === 200) {
            //     setSpiner(false)
            //     navigate("/user/otp",{state:email})
            // } else {
            //     toast.error(response.response.data.error);
            // }
        }
    }

    const [email, setEmail] = useState("");



    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            email

        }
        Axios.post('http://localhost:8000/api/users', newUser, { withCredentials: true })
            .then(res => {
                console.log("User created successfully: " + res.data.user_id);
                localStorage.setItem('userID', res.data.user._id);
                localStorage.setItem('userName', res.data.user.name);
                // navigate("/workspace");
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }
    const bodyStyle = {
        margin: 0,
        height: "100vh", // Set body height to full viewport height
        background: "#000000",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
    };
    const formStyle = {
        backgroundColor: "rgba(255, 255, 255, 0)", // Transparent white
        padding: "20px",
        borderRadius: "10px",
        border: "none",
    };
    return (
        <>
            <div style={bodyStyle}>

                <div className="container">
                    <div className="row">
                        <div className="col text-center mt-5">
                            <h1 className="display-3" style={{color: "yellow"}}>TrackerX</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="card p-4 shadow rounded border" style={formStyle}>
                                <h2 className="font-weight-bold text-center mb-4" style={{color: "yellow"}}>OTP Authentication</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        {errors && (
                                            <span className="text-danger">
                                                {errors?.email?.properties?.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="email" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                 
                                 
                                
                                    
                                    <div className="form-group">
                                        {errors && (
                                            <span className="text-danger">
                                                {errors?.confirmPassword?.properties?.message}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="form-group text-center">
                                        <button className="btn btn-primary btn-lg btn-block" onClick={sendOtp}>Send OTP</button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Email