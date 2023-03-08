import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import Wrapper from "../Helpers/Wrapper";
import { BigHead } from "@bigheads/core";

const Header = (props) => {
  const activeUser = useSelector((state) => state.user.isActive);
  const username = useSelector((state) => state.user.username);
  let gender = useSelector((state) => state.avatar.gender);
  const hairColor = useSelector((state) => state.avatar.hairColor);
  const hairStyle = useSelector((state) => state.avatar.hairStyle);
  const eyesStyle = useSelector((state) => state.avatar.eyes);
  const eyebrows = useSelector((state) => state.avatar.eyebrows);
  const mouth = useSelector((state) => state.avatar.mouth);
  const skin = useSelector((state) => state.avatar.skin);
  const beard = useSelector((state) => state.avatar.beard);
  const clothing = useSelector((state) => state.avatar.clothing);
  const clothingColor = useSelector((state) => state.avatar.clothingColor);

  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <h1>Bla bla</h1>
      </div>
      <div className={styles.headerAvatar}>
        {activeUser === 1 && (
          <Wrapper>
            <h3>Welcome {username} </h3>
            <BigHead
              className={styles.svg}
              body={gender}
              accessory="none"
              circleColor="blue"
              clothing={clothing}
              clothingColor={clothingColor}
              eyebrows={eyebrows}
              eyes={eyesStyle}
              facialHair={beard}
              graphic="react"
              hair={hairStyle}
              hairColor={hairColor}
              hat="none"
              lashes="false"
              lipColor="red"
              mouth={mouth}
              skinTone={skin}
            />
          </Wrapper>
        )}
      </div>
    </div>
  );
};

export default Header;
