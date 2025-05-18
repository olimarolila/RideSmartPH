import '../css/Tips.css';
import tip1Icon from '../assets/images/eco-drop.png';
import tip2Icon from '../assets/images/engine-check.png';
import tip3Icon from '../assets/images/fuel-efficiency.png';

function Tips() {
    return (
        <div className="tips-container">
            <div className="tips-grid">

                {/* Tip 1 */}
                <div className="tip-card">
                    <div className="tip-header">
                        <img src={tip1Icon} alt="Water Conservation Icon" className="tip-icon" />
                        <h6 className="tip-title">Conserve Water When Washing</h6>
                    </div>
                    <p className="tip-description">
                        Use a bucket instead of a hose when washing your motorcycle to save water.
                    </p>
                </div>

                {/* Tip 2 */}
                <div className="tip-card">
                    <div className="tip-header">
                        <img src={tip2Icon} alt="Engine Check Icon" className="tip-icon" />
                        <h6 className="tip-title">Regular Engine Checks</h6>
                    </div>
                    <p className="tip-description">
                        Keeping your engine in good condition reduces harmful emissions and improves performance.
                    </p>
                </div>

                {/* Tip 3 */}
                <div className="tip-card">
                    <div className="tip-header">
                        <img src={tip3Icon} alt="Fuel Efficiency Icon" className="tip-icon" />
                        <h6 className="tip-title">Fuel Efficiency Practices</h6>
                    </div>
                    <p className="tip-description">
                        Avoid rapid acceleration and maintain proper tire pressure to save fuel.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Tips;
