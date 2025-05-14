// import '../css/Developers.css';

// import BRIONES from "../assets/images/BRIONES.png";
// import BONIFACIO from "../assets/images/BONIFACIO.png";
// import OLILA from "../assets/images/OLILA.png";
// import PENA from "../assets/images/PEÑA.png";

// function Developers() {
//     return (
//         <div className="developer-section">
//             <h2 className="developer-title">OUR DEVELOPERS</h2>
//             <div className="developer-cards">
//                 <div className="developer-card">
//                     <img src={BRIONES} alt="Laurenz Briones" className="developer-img" />
//                     <div className="developer-info">
//                         <h3>LAURENZ NICOLO T. BRIONES</h3>
//                         <p>Project Developer</p>
//                     </div>
//                 </div>

//                 <div className="developer-card">
//                     <img src={BONIFACIO} alt="Ralph Bonifacio" className="developer-img" />
//                     <div className="developer-info">
//                         <h3>RALPH LORENZ M. BONIFACIO</h3>
//                         <p>Project Developer</p>
//                     </div>
//                 </div>

//                 <div className="developer-card">
//                     <img src={OLILA} alt="Olimar Olila" className="developer-img" />
//                     <div className="developer-info">
//                         <h3>OLIMAR DOMINIC R. OLILA</h3>
//                         <p>Project Developer</p>
//                     </div>
//                 </div>

//                 <div className="developer-card">
//                     <img src={PENA} alt="Julianne Peña" className="developer-img" />
//                     <div className="developer-info">
//                         <h3>JULIANNE MURIEL L. PEÑA</h3>
//                         <p>Project Developer</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Developers;

import '../css/Developers.css';

import BRIONES from "../assets/images/BRIONES.png";
import BONIFACIO from "../assets/images/BONIFACIO.png";
import OLILA from "../assets/images/OLILA.png";
import PENA from "../assets/images/PEÑA.png";

// Custom social icons
import fbIcon from "../assets/images/facebook.png";
import igIcon from "../assets/images/instagram.png";
import mailIcon from "../assets/images/email.png";

function Developers() {
    return (
        <div className="developer-section">
            <h2 className="developer-title">OUR DEVELOPERS</h2>
            <div className="developer-cards">

                {/* BONIFACIO with overlay and socials */}
                <div className="developer-card">
                    <img src={BONIFACIO} alt="Ralph Bonifacio" className="developer-img" />
                    <div className="developer-info">
                        <h3>RALPH LORENZ M. BONIFACIO</h3>
                        <p>Project Developer</p>
                    </div>
                    <div className="developer-hover-description">
                        <div className="hover-text">
                            <h4>RALPH LORENZ M. BONIFACIO</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel turpis at odio luctus tincidunt. Cras sed ligula eget nisi faucibus tincidunt.</p>
                        </div>
                        <div className="developer-socials">
                            <a href="https://www.instagram.com/lorenzbnfc/" target="_blank" rel="noopener noreferrer">
                                <img src={igIcon} alt="Instagram" className="social-icon" />
                            </a>
                            <a href="https://www.facebook.com/HiAkoSiLorenz/" target="_blank" rel="noopener noreferrer">
                                <img src={fbIcon} alt="Facebook" className="social-icon" />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ralphlorenz.bonifacio.cics@ust.edu.ph" target="_blank" rel="noopener noreferrer">
                                <img src={mailIcon} alt="Email" className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* BRIONES */}
                  <div className="developer-card">
                    <img src={BRIONES} alt="Laurenz Briones" className="developer-img" />
                    <div className="developer-info">
                        <h3>LAURENZ NICOLO T. BRIONES</h3>
                        <p>Project Developer</p>
                    </div>
                    <div className="developer-hover-description">
                        <div className="hover-text">
                            <h4>LAURENZ NICOLO T. BRIONES</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar eros nec augue convallis tempor.</p>
                        </div>
                        <div className="developer-socials">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={igIcon} alt="Instagram" className="social-icon" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <img src={fbIcon} alt="Facebook" className="social-icon" />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=laurenznicolo.briones.cics@ust.edu.ph" target="_blank" rel="noopener noreferrer">
                                <img src={mailIcon} alt="Email" className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* OLILA */}
                <div className="developer-card">
                    <img src={OLILA} alt="Olimar Olila" className="developer-img" />
                    <div className="developer-info">
                        <h3>OLIMAR DOMINIC R. OLILA</h3>
                        <p>Project Developer</p>
                    </div>
                    <div className="developer-hover-description">
                        <div className="hover-text">
                            <h4>OLIMAR DOMINIC R. OLILA</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lectus vitae nisl sodales fringilla.</p>
                        </div>
                        <div className="developer-socials">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={igIcon} alt="Instagram" className="social-icon" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <img src={fbIcon} alt="Facebook" className="social-icon" />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=olimardominic.olila.cics@ust.edu.ph" target="_blank" rel="noopener noreferrer">
                                <img src={mailIcon} alt="Email" className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* PENA */}
                 <div className="developer-card">
                    <img src={PENA} alt="Julianne Peña" className="developer-img" />
                    <div className="developer-info">
                        <h3>JULIANNE MURIEL L. PEÑA</h3>
                        <p>Project Developer</p>
                    </div>
                    <div className="developer-hover-description">
                        <div className="hover-text">
                            <h4>JULIANNE MURIEL L. PEÑA</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus.</p>
                        </div>
                        <div className="developer-socials">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={igIcon} alt="Instagram" className="social-icon" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <img src={fbIcon} alt="Facebook" className="social-icon" />
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=juliannemuriel.pena.cics@ust.edu.ph" target="_blank" rel="noopener noreferrer">
                                <img src={mailIcon} alt="Email" className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Developers;
