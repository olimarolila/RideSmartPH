import '../css/Info.css';
import scheduleIcon from '../assets/images/schedule.png';
import remindersIcon from '../assets/images/shopping-list.png';
import ecoIcon from '../assets/images/eco-bulb.png';
import { Link } from "react-router-dom";


function Info() {
    return (
        <div className="container">
            <div className="mainBox">
                 {/* Box 1: Maintenance Dashboard */}
                <Link to="/maintenance-dashboard" className="info-box-link">
                    <div className="info-box hoverable">
                        <div>
                            <div className="d-flex align-items-center mb-2">
                                <img src={scheduleIcon} alt="Schedule Icon" className="info-icon-title" />
                                <h6 className="info-title mb-0">Maintenance Dashboard</h6>
                            </div>
                            <p className="info-subtitle mb-0">
                                Track your oil changes, tire checks, and more with a personalized dashboard.
                            </p>
                        </div>
                    </div>
                </Link>


                {/* Box 2: Automated Reminders */}

                    <div className="info-box">
                        <div>
                            <div className="d-flex align-items-center mb-2">
                                <img src={remindersIcon} alt="Reminders Icon" className="info-icon-title" />
                                <h6 className="info-title mb-0">Automated Reminders</h6>
                            </div>
                            <p className="info-subtitle mb-0">
                                Never miss a maintenance task with automatic reminders for upcoming tasks.
                            </p>
                        </div>
                    </div>


                {/* Box 3: Eco-Friendly Practices */}

                    <div className="info-box">
                        <div>
                            <div className="d-flex align-items-center mb-2">
                                <img src={ecoIcon} alt="Eco Icon" className="info-icon-title" />
                                <h6 className="info-title mb-0">Eco-Friendly Tips</h6>
                            </div>
                            <p className="info-subtitle mb-0">
                                Discover tips and resources to reduce emissions and improve fuel efficiency.
                            </p>
                        </div>
                    </div>

            </div>
        </div>
    );
}

export default Info;
