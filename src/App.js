import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// // import Login from "./Components/Login/Login";
// import Messages from "./Components/Chat/Messages";
// import Input from "./Components/Chat/Input";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import Header from "./Components/UI/Header";
import { userActions } from "./Components/Redux/Redux";
import Swal from "sweetalert2";

let drone = undefined;
let room = undefined;
function App(props) {
  const username = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.avatar);
  if (username.trim().length > 0 && drone === undefined) {
    drone = new window.Scaledrone("kZzbMf5ULmb2MURh", {
      data: {
        username: username,
        avatar: avatar,
      },
    });
    drone.on("close", async (event) => {
      drone = undefined;
      room = undefined;
      // console.log("Drone disconnected");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      await Toast.fire({
        icon: "info",
        title: "Disconnected! Login again.",
      });
    });
  }
  if (drone && room === undefined) {
    room = drone.subscribe("observable-general");
  }

  const dispatch = useDispatch();
  const [userIsActive, setUserIsActive] = useState(false);
  // const [thisUser, setThisUser] = useState('');
  const setUser = () => {
    dispatch(userActions.isActive(1));
    setUserIsActive(true);
  };
  const setUserInactive = () => {
    setUserIsActive(false);
  };

  return (
    <div className="App">
      {userIsActive === true ? (
        <Header drone={drone}></Header>
      ) : (
        <Header></Header>
      )}
      {userIsActive === true ? (
        <Chat onSubmit={setUserInactive} drone={drone} room={room} />
      ) : (
        <Login onSubmit={setUser} drone={drone} />
      )}
    </div>
  );
}

export default App;

// function randomName() {
//   const adjectives = [
//     "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
//     "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
//     "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
//     "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
//     "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
//     "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
//     "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
//     "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
//     "ancient", "purple", "lively", "nameless"
//   ];
//   const nouns = [
//     "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
//     "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
//     "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
//     "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
//     "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
//     "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
//     "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
//     "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
//     "smoke", "star"
//   ];
//   const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
//   const noun = nouns[Math.floor(Math.random() * nouns.length)];
//   return adjective + noun;
// }

// function randomColor() {
//   return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
// }
// class App extends Component {
//   state = {
//     messages: [],
//     member: {
//       username: randomName(),
//       color: randomColor(),
//     }
//   }

//   constructor() {
//     super();
//     this.drone = new window.Scaledrone("tuWX20jOh6EVYttM", {
//       data: this.state.member
//     });
//     this.drone.on('open', error => {
//       if (error) {
//         return console.error(error);
//       }
//       const member = {...this.state.member};
//       member.id = this.drone.clientId;
//       this.setState({member});
//     });
//     const room = this.drone.subscribe("observable-room");
//     room.on('data', (data, member) => {
//       const messages = this.state.messages;
//       messages.push({member, text: data});
//       this.setState({messages});
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <h1>My Chat App</h1>
//         </div>
//         <Messages
//           messages={this.state.messages}
//           currentMember={this.state.member}
//         />
//         <Input
//           onSendMessage={this.onSendMessage}
//         />
//       </div>
//     );
//   }

//   onSendMessage = (message) => {
//     this.drone.publish({
//       room: "observable-room",
//       message
//     });
//   }

// }

// export default App;
