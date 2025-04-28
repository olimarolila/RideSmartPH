function Info() {
    return (
      <div className="container my-5 information">
        <div className="row mainBox">
          
          {/* Box 1 */}
          <div className="col-md-6">
            <div className="info-box d-flex align-items-center p-3">
              <div className="icon-container">
                <img src="https://media-public.canva.com/DyLHI/MAFofuDyLHI/1/t.png" height={150} alt="Maintenance Icon" className="info-icon" />
              </div>
              <div className="ms-3">
                <h6 className="info-title mb-1">Track Your Maintenance</h6>
                <p className="info-subtitle mb-0">Sign up and monitor your motorcycle's maintenance schedule with ease. stay on top of essential tasks and extend the life of your ride.</p>
              </div>
            </div>
          </div>
  
          {/* Box 2 */}
          <div className="col-md-6">
            <div className="info-box d-flex align-items-center p-3">
              <div className="icon-container">
                <img src="https://media-public.canva.com/nDF8k/MAFuZ8nDF8k/1/t.png" height={150} alt="Maintenance Icon" className="info-icon" />
              </div>
              <div className="ms-3">
                <h6 className="info-title mb-1">Maintenance Log</h6>
                <p className="info-subtitle mb-0">Last Task</p>
                <small className="text-muted">Tire Check - May 5</small>
              </div>
            </div>
          </div>
  
          
  
        </div>
      </div>
    );
  }
  
  export default Info;
  