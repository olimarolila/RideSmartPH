function Info() {
    return (
      <div className="container my-5 information">
        <div className="row mainBox">
          
          {/* Box 1 */}
          <div className="col-md-4">
            <div className="info-box d-flex align-items-center p-3">
              <div className="icon-container">
                {/* <img src="https://media-public.canva.com/DyLHI/MAFofuDyLHI/1/t.png" height={150} alt="Maintenance Icon" className="info-icon" /> */}
              </div>
              <div className="ms-3">
                <h6 className="info-title mb-1">Maintenance Dashboard</h6>
                <p className="info-subtitle mb-0">Track your oil changes, tire checks, and more with a personalized-dashboard.</p>
              </div>
            </div>
          </div>
  
          {/* Box 2 */}
          <div className="col-md-4">
            <div className="info-box d-flex align-items-center p-3">
              <div className="icon-container">
                {/* <img src="https://media-public.canva.com/nDF8k/MAFuZ8nDF8k/1/t.png" height={150} alt="Maintenance Icon" className="info-icon" /> */}
              </div>
              <div className="ms-3">
                <h6 className="info-title mb-1">Automated Reminders</h6>
                <p className="info-subtitle mb-0">Never miss a maintenance task with automatic reminders for upcoming tasks.</p>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="col-md-4">
            <div className="info-box d-flex align-items-center p-3">
              <div className="icon-container">
                {/* <img src="https://media-public.canva.com/nDF8k/MAFuZ8nDF8k/1/t.png" height={150} alt="Maintenance Icon" className="info-icon" /> */}
              </div>
              <div className="ms-3">
                <h6 className="info-title mb-1">Eco-Friendly Practices</h6>
                <p className="info-subtitle mb-0">Discover tips and resources to reduce emissions and improve fuel efficiency.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          
        </div>
      </div>
    );
  }
  
  export default Info;
  