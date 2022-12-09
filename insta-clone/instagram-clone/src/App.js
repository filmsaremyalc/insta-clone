import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import ImageUpload from "./ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setOpenSignup(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };
  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenLogin(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="app">
      <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
        <Box className="app__modal" sx={style}>
          <center>
            <img
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram original logo"
            />
          </center>
          <form className="app__signUp">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary__button" type="submit" onClick={signUp}>
              Sign up
            </button>
          </form>
          <center className="authFooter">
            <small>
              &copy; 2021 Instagram Tribute by{" "}
              <a href="mailto:bkrofegha@gmail.com"> Blessing Krofegha</a>
            </small>
          </center>
        </Box>
      </Modal>
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box className="app__modal" sx={style}>
          <center>
            <img
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram original logo"
            />
          </center>
          <form className="app__signUp">
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary__button" type="submit" onClick={login}>
              Log in
            </button>
          </form>
          <center className="authFooter">
            <small>
              &copy; 2021 Instagram Tribute by{" "}
              <a href="mailto:bkrofegha@gmail.com"> Blessing Krofegha</a>
            </small>
          </center>
        </Box>
      </Modal>
      <div className="app__header">
        <div className="app__headerWrapper">
          <img
            src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram original logo"
          />
          {user ? (
            <button className="text__button" onClick={() => auth.signOut()}>
              Logout
            </button>
          ) : (
            <div className="app__headerButtons">
              <button
                className="primary__button"
                onClick={() => setOpenLogin(true) || setOpenSignup(false)}
              >
                Log in
              </button>
              <button
                className="text__button"
                onClick={() => setOpenSignup(true) || setOpenLogin(false)}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="timeline">
        {user && <ImageUpload user={user} />}
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user} // To pass current user and keep track of current user when adding comment
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
