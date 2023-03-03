import * as React from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "./updateModal.scss";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "react-query";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateModal = ({ openUpModal, setOpenUpModal, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    fillName: "",
    city: "",
    country: "",
  });

  const upload = async (file) => {
    try {
      //create form Data because we cannot send the file directly to the API because
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post("/upload", formData);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  //mutations after send the new user info it's gonna refresh our fetch method get User
  // Access the client
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation(
    (User) => {
      return makeRequest.put("/users/update", User);
    },
    {
      onSuccess: () => {
        //Invalidate and refresh
        queryClient.invalidateQueries("user");
      },
    }
  );

  //assign res of upload function to the imgUrl and send to the mutation
  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpModal(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div>
      <Dialog
        fullWidth="500px"
        open={openUpModal}
        onClose={() => setOpenUpModal(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            background: "#fff",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenUpModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update User Information
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick}>
              Update
            </Button>
          </Toolbar>
        </AppBar>
        <List
          sx={{
            width: "100%",
            background: "#fff",
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ListItem>
            <TextField
              id="fullName"
              label="fullName"
              variant="outlined"
              sx={{
                width: "90%",
              }}
              type="text"
              name="fullName"
              onChange={handleChange}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              sx={{
                width: "90%",
              }}
              type="text"
              name="city"
              onChange={handleChange}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              sx={{
                width: "90%",
              }}
              type="text"
              name="country"
              onChange={handleChange}
            />
          </ListItem>
        </List>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "none",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          <Stack direction="row" alignItems="center">
            <Button
              variant="contained"
              component="label"
              sx={{
                background: "#0288d1",
              }}
            >
              Profile Picture
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Button
              variant="contained"
              component="label"
              sx={{
                background: "#0288d1",
              }}
            >
              Cover Picture
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
};

export default UpdateModal;
