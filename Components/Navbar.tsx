import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import navStyle from "../styles/Navbar.module.css";
import { useState } from "react";
import { Colours } from "../Classes/Colors";

const Navbar = () => {
  const lightMode = new Colours("light");
  const darkMode = new Colours("dark");
  const [icon, setIcon] = useState(faMoon);
  const [light, setLight] = useState(true);

  const changeMode = () => {
    setLight(!light);
    if (light) {
      setIcon(faMoon);
      darkMode.changeMode();
    } else {
      setIcon(faSun);
      lightMode.changeMode();
    }
  };

  return (
    <div className={navStyle.navbar}>
      <div className={navStyle.logo}>
        <h1>Where in the world?</h1>
      </div>
      <div className="mode" onClick={() => changeMode()}>
        <FontAwesomeIcon icon={icon} />
        Dark Mode
      </div>
    </div>
  );
};

export default Navbar;
