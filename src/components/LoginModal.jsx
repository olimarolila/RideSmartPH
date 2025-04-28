function LoginModal({ show, onClose, onSwitch }) {
    return (
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
        <div className="modal-dialog modal-dialog-top slide-bottom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input type="email" className="form-control mb-3" placeholder="Email" />
              <input type="password" className="form-control mb-3" placeholder="Password" />
              <button className="btn btn-success w-100">Login</button>
              <p className="mt-3 text-center">
                Don’t have an account? <span style={{cursor: 'pointer', color: '#0d6efd'}} onClick={onSwitch}>Sign Up here</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginModal;
  