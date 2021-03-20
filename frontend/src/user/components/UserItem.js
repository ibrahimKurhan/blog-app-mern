import React, { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deletePost } from "../../redux/actions/postAction";
import { editProfile } from "../../redux/actions/authAction";
import FileBase from "react-file-base64";

import { useHistory } from "react-router-dom";
import { TextField, Typography, Paper } from "@material-ui/core";
import useStyles from "../../posts/pages/styles";

const user = JSON.parse(localStorage.getItem("profile"));
console.log(user);

const UserItem = (props) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [image, setImage] = useState(user?.image);
  const [password, setPassword] = useState(user?.password);
  const [confirmPassword, setConfirmPassword] = useState(user?.confirmPassword);
  const [message, setMessage] = useState(null);

  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const userPost = useSelector((state) =>
    state.posts.filter((post) => post?.creator === user?.userId)
  );
  console.log(userPost);

  const handleEdit = () => {
    history.push("/posts/new");
  };

  const userEditHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        editProfile({
          _id: user.userId,
          name,
          email,
          password,
          image,
          token: user.token,
        })
      );
    }
    console.log({
      _id: user.userId,
      name,
      email,
      password,
      token: user.token,
      image,
    });
  };

  return (
    <li className="user-item">
      <Paper className="user-item__content">
        <form autoComplete="off" className={`${classes.root} ${classes.form}`}>
          <Typography variant="h6">Edit user info </Typography>

          <div className="user-item__info">
            <div className="user-item__image">
              <Avatar image={image} alt={user?.name} />
              {/* <div className={classes.fileInput}>
                <FileBase
                  style={{ marginBottom: "20px" }}
                  id="image"
                  type="file"
                  multiple={false}
                  // onDone={({ base64 }) =>
                  //   setPostData({ ...postData, image: base64 })
                  // }
                />
              </div> */}
            </div>
            <div className={classes.fileInputs}>
              <FileBase
                style={{ marginBottom: "20px" }}
                id="image"
                type="file"
                multiple={false}
                value={image}
                onDone={({ base64 }) => setImage({ image: base64 })}
              />
            </div>
            <TextField
              name="name"
              required
              variant="outlined"
              label="Name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {/* {user?.name} */}
            {/* </TextField> */}
            <TextField
              name="email"
              required
              variant="outlined"
              label="Email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* {user?.email} */}
            {/* </TextField> */}
            <TextField
              name="password"
              required
              variant="outlined"
              label="Password"
              fullWidth
              type="password"
              style={{ marginTop: "20px" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              name="confirmPassword"
              required
              variant="outlined"
              label="Confirm Password"
              fullWidth
              type="password"
              style={{ marginTop: "20px" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {/* {user?.password} */}
            {/* </TextField> */}

            <Button onClick={userEditHandler}>Update</Button>
            {/* <TextField style={{ marginTop: "20px" }}></TextField> */}
          </div>
        </form>
      </Paper>
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>
        {userPost.length} {userPost.length === 1 ? "Post" : "Posts"}
      </h3>
      <Card className="user-item__content">
        {userPost.map((item) => {
          return (
            <div style={{ marginBottom: "20px" }} key={item._id}>
              <div className="place-item__image">
                <img src={item.image} alt={item.title} />
              </div>{" "}
              <div className="place-item__info">
                <h2>{item.name}</h2>
                <p>{moment(item.createdAt).fromNow()}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.tags?.map((tag) => `#${tag} `)}</p>
              </div>
              <div className="place-item__actions">
                <div>
                  <Button
                    onClick={() => handleEdit(props.setCurrentId(item._id))}
                  >
                    EDIT
                  </Button>
                  <Button danger onClick={() => dispatch(deletePost(item._id))}>
                    DELETE
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </li>
  );
};

export default UserItem;