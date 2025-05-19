import '../css/Info.css';
import scheduleIcon from '../assets/images/schedule.png';
import remindersIcon from '../assets/images/shopping-list.png';
import ecoIcon from '../assets/images/eco-bulb.png';
import { Link } from "react-router-dom";


function Info() {
    return (
        <div className="container">
            <div className="mainBox">
                {/* Box 1: Motorcycle Specs */}
                <Link to="/motorcycles" className="info-box-link">
                <div className="info-box hoverable">
                    <div>
                    <div className="d-flex align-items-center mb-2">
                        <img src={scheduleIcon} alt="Specs Icon" className="info-icon-title" />
                        <h6 className="info-title mb-0">Motorcycle Specs</h6>
                    </div>
                    <p className="info-subtitle mb-0">
                        Search and explore detailed specifications of different motorcycle models.
                    </p>
                    </div>
                </div>
                </Link>

                {/* Box 2: Maintenance Dashboard */}
                <Link to="/maintenance-dashboard" className="info-box-link">
                <div className="info-box hoverable">
                    <div>
                    <div className="d-flex align-items-center mb-2">
                        <img src={remindersIcon} alt="Dashboard Icon" className="info-icon-title" />
                        <h6 className="info-title mb-0">Maintenance Dashboard</h6>
                    </div>
                    <p className="info-subtitle mb-0">
                        Record your last maintenance and see when your next service is due.
                    </p>
                    </div>
                </div>
                </Link>

                {/* Box 3: Maintenance Logs */}
                <Link to="/maintenance-logs" className="info-box-link">
                <div className="info-box hoverable">
                    <div>
                    <div className="d-flex align-items-center mb-2">
                        <img src={ecoIcon} alt="Logs Icon" className="info-icon-title" />
                        <h6 className="info-title mb-0">Maintenance Logs</h6>
                    </div>
                    <p className="info-subtitle mb-0">
                        View your full maintenance history in one place for better tracking and planning.
                    </p>
                    </div>
                </div>
                </Link>

                {/* Box 4: Tips Page */}
                <Link to="/tips" className="info-box-link">
                <div className="info-box hoverable">
                    <div>
                    <div className="d-flex align-items-center mb-2">
                        <img src={ecoIcon} alt="Tips Icon" className="info-icon-title" />
                        <h6 className="info-title mb-0">Sustainability Tips</h6>
                    </div>
                    <p className="info-subtitle mb-0">
                        Learn sustainable motorcycle practices to reduce your environmental footprint.
                    </p>
                    </div>
                </div>
                </Link>

                {/* Box 5: Cost Tracker */}
                <Link to="/cost-tracker" className="info-box-link">
                <div className="info-box hoverable">
                    <div>
                    <div className="d-flex align-items-center mb-2">
                        <img src={scheduleIcon} alt="Cost Icon" className="info-icon-title" />
                        <h6 className="info-title mb-0">Cost Tracker</h6>
                    </div>
                    <p className="info-subtitle mb-0">
                        Monitor your motorcycle maintenance expenses and keep track of service costs.
                    </p>
                    </div>
                </div>
                </Link>

            </div>
            </div>

    );
}

export default Info;
