// import { useState } from 'react';
// import '../css/SignUpModal.css';

// function SignUpModal({ show, onClose, onSwitch }) {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const handleSignUp = () => {
//         if (!username || !email || !password || !confirmPassword){
//             alert('Please fill out all fields.');
//             return;
//         }

//         if (password !== confirmPassword){
//             alert('Password do not match.');
//             return;
//         }
//         const userData = {
//             username,
//             email,
//             password
//         };

//         localStorage.setItem('user', JSON.stringify(userData));
//         alert('Account created successfully!');
//         onClose();
//     };

//     return (
//         <div className={`signup-modal modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
//             <div className="modal-dialog modal-dialog-top slide-bottom">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">Sign Up</h5>
//                         <button type="button" className="btn-close" onClick={onClose}></button>
//                     </div>
//                     <div className="modal-body">

//                         <div className="form-floating mb-3">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="signup-username"
//                                 placeholder="Username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             <label htmlFor="signup-username">Username</label>
//                         </div>

//                         <div className="form-floating mb-3">
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 id="signup-email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <label htmlFor="signup-email">Email</label>
//                         </div>

//                         <div className="mb-3 position-relative">
//                             <div className="form-floating">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     className="form-control pe-5"
//                                     id="signup-password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <label htmlFor="signup-password">Password</label>
//                             </div>
//                             <button type="button" className="btn toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
//                                 <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                             </button>
//                         </div>

//                         <div className="mb-3 position-relative">
//                             <div className="form-floating">
//                                 <input
//                                     type={showConfirmPassword ? 'text' : 'password'}
//                                     className="form-control pe-5"
//                                     id="signup-confirmPassword"
//                                     placeholder="Confirm Password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                 />
//                                 <label htmlFor="signup-confirmPassword">Confirm Password</label>
//                             </div>
//                             <button type="button" className="btn toggle-visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                 <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                             </button>
//                         </div>

//                         <button className="btn btn-success w-100" onClick={handleSignUp}>Sign Up</button>

//                         <p className="text-center">
//                             Already have an account? <span style={{ color: '#133D1E', cursor: 'pointer' }} onClick={onSwitch}>Log In</span>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// export default SignUpModal;

import { useState } from 'react';
import '../css/SignUpModal.css';

function SignUpModal({ show, onClose, onSwitch }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const handleSignUp = () => {
        setPasswordError('');
        setConfirmError('');

        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill out all fields.');
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be 8+ chars with uppercase, lowercase, number & symbol.');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmError('Passwords do not match.');
            return;
        }

        const userData = { username, email, password };
        localStorage.setItem('user', JSON.stringify(userData));
        alert('Account created successfully!');
        onClose();
    };

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
                            <input
                                type="text"
                                className="form-control"
                                id="signup-username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="signup-username">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="signup-email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="signup-email">Email</label>
                        </div>

                        <div className="mb-1 position-relative">
                            <div className="form-floating">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control pe-5"
                                    id="signup-password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="signup-password">Password</label>
                            </div>
                            <button type="button" className="btn toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                            {passwordError && <div className="text-danger mt-1 ms-1" style={{ fontSize: '0.875rem' }}>{passwordError}</div>}
                        </div>

                        <div className="mb-1 position-relative">
                            <div className="form-floating">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-control pe-5"
                                    id="signup-confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label htmlFor="signup-confirmPassword">Confirm Password</label>
                            </div>
                            <button type="button" className="btn toggle-visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                            {confirmError && <div className="text-danger mt-1 ms-1" style={{ fontSize: '0.875rem' }}>{confirmError}</div>}
                        </div>

                        <button className="btn btn-success w-100 mt-3" onClick={handleSignUp}>Sign Up</button>

                        <p className="text-center mt-2">
                            Already have an account? <span style={{ color: '#133D1E', cursor: 'pointer' }} onClick={onSwitch}>Log In</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;
