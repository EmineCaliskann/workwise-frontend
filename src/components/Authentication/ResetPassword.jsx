import React, { useEffect, useState } from 'react'
import brandLight from "../../assets/static/images/logo/workwise.png"
import brandDark from "../../assets/static/images/logo/workwisedark.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

function ResetPassword({ theme, setTheme }) {
    const params = useParams();
    const userId = params.id;
    const navigate = useNavigate();

    const THEME_KEY = "theme";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme("light");
        }
        document.documentElement.setAttribute('data-bs-theme', theme)
        localStorage.setItem(THEME_KEY, "light");

    }, []);

    useEffect(() => {
        document.body.classList.add(theme)
        document.documentElement.setAttribute('data-bs-theme', theme)
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleDarkTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleResetPassword = async (e) => {
        const resetUri = "https://workwiseappi.azurewebsites.net/api/Auth/ResetPassword"
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't matches!");
        }
        else {

            try {
                const response = await axios.post(resetUri, {
                    userId,
                    password
                });
                toast.success(response.data);
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                navigate("/login");
            } catch (error) {
                toast.error("Invalid attempt");
            }
        }
    }

    return (
        <>
            <div id="auth">

                <div className="row h-100">
                    <div className="col-lg-6 col-xl-5 col-12">
                        <div id="auth-left">
                            <div className="auth-logo">
                                <div className="logo mb-2">
                                    <a href="/"><img src={theme === "light" ? brandLight : brandDark} alt="brand" />
                                        <span className="brand-name fs-1 fw-bold">WorkWise</span></a>
                                </div>
                            </div>
                            <div className="theme-toggle d-flex gap-2  align-items-center my-2 ms-5">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                                    role="img" className="iconify iconify--system-uicons" width="20" height="20"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21">
                                    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path
                                            d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2"
                                            opacity=".3"></path>
                                        <g transform="translate(-210 -1)">
                                            <path d="M220.5 2.5v2m6.5.5l-1.5 1.5"></path>
                                            <circle cx="220.5" cy="11.5" r="4"></circle>
                                            <path d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2"></path>
                                        </g>
                                    </g>
                                </svg>
                                <div className="form-check form-switch fs-6">
                                    <input className="form-check-input me-0" type="checkbox" id="toggle-dark" style={{ cursor: "pointer" }} onChange={toggleDarkTheme} checked={theme ? theme == "dark" : ""} />
                                    <label className="form-check-label"></label>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                                    role="img" className="iconify iconify--mdi" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z">
                                    </path>
                                </svg>
                            </div>
                            <h1 className="auth-title">Reset Password</h1>
                            <p className="auth-subtitle mb-5">Create a new password to login</p>

                            <form onSubmit={handleResetPassword}>
                                <div className="form-group position-relative has-icon-left mb-4">
                                    <input type="password" className="form-control" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-shield-lock"></i>
                                    </div>
                                </div>
                                <div className="form-group position-relative has-icon-left mb-4">
                                    <input type="password" className="form-control" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-shield-lock"></i>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-block btn-lg shadow-lg mt-3">Reset Password</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-7 d-none d-lg-block">
                        <div id="auth-right">
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ResetPassword