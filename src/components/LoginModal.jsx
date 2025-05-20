import '../css/LoginModal.css';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { toast } from 'react-toastify';

function LoginModal({ show, onClose, onSwitch }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            toast.warn('Please enter both email and password.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful!');
            onClose();
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.error('No account found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password.');
            } else {
                toast.error(`Login failed: ${error.message}`);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success('Google login successful!');
            onClose();
        } catch (error) {
            toast.error(`Google login failed: ${error.message}`);
        }
    };

    return (
        <div className={`login-modal modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
            <div className="modal-dialog modal-dialog-top slide-bottom">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Log In</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="login-email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="login-email">Email</label>
                        </div>

                        <div className="mb-3 position-relative">
                            <div className="form-floating">
                                <input type={showPassword ? 'text' : 'password'} className="form-control pe-5" id="login-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="login-password">Password</label>
                            </div>
                            <button type="button" className="btn toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>

                        <button className="btn btn-success w-100 mb-2" onClick={handleLogin}>Login</button>

                        <div className="text-center mb-2">or</div>

                        <button className="btn btn-outline-dark w-100" onClick={handleGoogleLogin}>
                            <i className="bi bi-google me-2"></i> Sign in with Google
                        </button>

                        <p className="mt-3 text-center">
                            Don't have an account? <span style={{ color: '#133D1E', cursor: 'pointer' }} onClick={onSwitch}>Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;