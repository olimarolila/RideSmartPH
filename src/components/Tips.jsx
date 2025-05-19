import '../css/Tips.css';
import sustainableTips from '../data/tips';

// Sound effect
import clickSound from '../assets/sounds/click.wav';

// Icon imports (match file names exactly)
import tip1Icon from '../assets/images/eco-drop.png';
import tip2Icon from '../assets/images/engine-check.png';
import tip3Icon from '../assets/images/fuel-efficiency.png';
import tip4Icon from '../assets/images/engine-oil.png';
import tip5Icon from '../assets/images/filter.png';
import tip6Icon from '../assets/images/inflate.png';
import tip7Icon from '../assets/images/process.png';
import tip8Icon from '../assets/images/light.png';
import tip9Icon from '../assets/images/cleaning.png';
import tip10Icon from '../assets/images/spare-parts.png';
import tip11Icon from '../assets/images/natural.png';
import tip12Icon from '../assets/images/speedometer.png';
import tip13Icon from '../assets/images/group.png';

const iconMap = {
  "eco-drop": tip1Icon,
  "engine-check": tip2Icon,
  "fuel-efficiency": tip3Icon,
  "engine-oil": tip4Icon,
  "filter": tip5Icon,
  "inflate": tip6Icon,
  "process": tip7Icon,
  "light": tip8Icon,
  "cleaning": tip9Icon,
  "spare-parts": tip10Icon,
  "natural": tip11Icon,
  "speedometer": tip12Icon,
  "group": tip13Icon
};

function Tips() {
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div className="tips-container">
      <div className="tips-grid">
        {sustainableTips.map((item) => (
          <div
            key={item.id}
            className="tip-card"
            onClick={playClickSound}
            style={{ cursor: "pointer" }}
          >
            <div className="tip-header">
              {item.icon && iconMap[item.icon] && (
                <img
                  src={iconMap[item.icon]}
                  alt={`${item.category} Icon`}
                  className="tip-icon"
                />
              )}
              <h6 className="tip-title">{item.category}</h6>
            </div>
            <p className="tip-description">{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;
