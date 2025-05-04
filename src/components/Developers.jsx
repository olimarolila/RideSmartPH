import '../css/Developers.css';

import BRIONES from "../assets/images/BRIONES.png";
import BONIFACIO from "../assets/images/BONIFACIO.png";
import OLILA from "../assets/images/OLILA.png";
import PENA from "../assets/images/PEÑA.png";

function Developers() {
    return (
        <div className="developer-section">
            <h2 className="developer-title">OUR DEVELOPERS</h2>
            <div className="developer-cards">
                <div className="developer-card">
                    <img src={BRIONES} alt="Laurenz Briones" className="developer-img" />
                    <div className="developer-info">
                        <h3>LAURENZ NICOLO T. BRIONES</h3>
                        <p>Project Developer</p>
                    </div>
                </div>

                <div className="developer-card">
                    <img src={BONIFACIO} alt="Ralph Bonifacio" className="developer-img" />
                    <div className="developer-info">
                        <h3>RALPH LORENZ M. BONIFACIO</h3>
                        <p>Project Developer</p>
                    </div>
                </div>

                <div className="developer-card">
                    <img src={OLILA} alt="Olimar Olila" className="developer-img" />
                    <div className="developer-info">
                        <h3>OLIMAR DOMINIC R. OLILA</h3>
                        <p>Project Developer</p>
                    </div>
                </div>

                <div className="developer-card">
                    <img src={PENA} alt="Julianne Peña" className="developer-img" />
                    <div className="developer-info">
                        <h3>JULIANNE MURIEL L. PEÑA</h3>
                        <p>Project Developer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Developers;