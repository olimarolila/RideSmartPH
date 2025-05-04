import { useState } from 'react';
import '../css/SignUpModal.css';

function SignUpModal({ show, onClose, onSwitch }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    return (
        <div className={`signup-modal modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
            <div className="modal-dialog modal-dialog-top slide-bottom">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sign Up</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="signup-username" placeholder="Username" />
                            <label htmlFor="username">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="signup-email" placeholder="Email" />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="mb-3 position-relative">
                            <div className="form-floating">
                                <input type={showPassword ? 'text' : 'password'} className="form-control pe-5" id="signup-password" placeholder="Password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button type="button" className="btn toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>

                        <div className="mb-3 position-relative">
                            <div className="form-floating">
                                <input type={showConfirmPassword ? 'text' : 'password'} className="form-control pe-5" id="signup-confirmPassword" placeholder="Confirm Password" />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <button type="button" className="btn toggle-visibility" onClick={() => setshowConfirmPassword(!showConfirmPassword)}>
                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>

                        <button className="btn btn-success w-100">Sign Up</button>

                        <p className="text-center">
                            Already have an account? <span style={{color: '#133D1E'}} onClick={onSwitch}>Log In</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;