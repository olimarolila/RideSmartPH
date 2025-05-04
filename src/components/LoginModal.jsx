import { useState } from 'react';
import '../css/LoginModal.css';

function LoginModal({ show, onClose, onSwitch }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`login-modal modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
            <div className="modal-dialog modal-dialog-top slide-bottom">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Log In</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" placeholder="Email" />
                            <label htmlFor="email">Email</label>
                        </div>
                        
                        <div className="mb-3 position-relative">
                            <div className="form-floating">
                                <input type={showPassword ? 'text' : 'password'} className="form-control pe-5" id="password" placeholder="Password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button type="button" className="btn toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>

                        <button className="btn btn-success w-100">Login</button>
                        <p className="mt-3 text-center">
                            Don't have an account? <span style={{color: '#133D1E'}} onClick={onSwitch}>Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default LoginModal;