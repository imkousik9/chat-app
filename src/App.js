import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from './store/StateProvider';
import { USER } from './graphql/queries';
import { CREATE_ROOM } from './graphql/mutations';

import { Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import SignUp from './components/SignUp';

import './App.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #6a1b4d',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function App() {
  const [{ isAuthenticated }, dispatch] = useAuth();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [roomName, setRoomName] = useState('');
  const [open, setOpen] = useState(false);

  const [addRoom] = useMutation(CREATE_ROOM);

  const createRoom = async (e) => {
    e.preventDefault();
    if (roomName) {
      await addRoom({ variables: { name: roomName } });
      setRoomName('');
      setOpen(false);
    }
  };

  useQuery(USER, {
    onError: (err) => console.log(err),
    onCompleted(data) {
      const user = {
        email: data?.user.email,
        name: data?.user.name
      };
      dispatch({
        type: 'SET_USER',
        user: user
      });
    }
  });

  return (
    <div className="app">
      <Router>
        {isAuthenticated ? (
          <div className="app__body">
            <Modal open={open} onClose={() => setOpen(false)}>
              <div style={modalStyle} className={classes.paper}>
                <form className="app__modal" onSubmit={createRoom}>
                  <h2>Create Chat Room</h2>
                  <TextField
                    type="text"
                    label="Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                  <Button type="submit">Create Room</Button>
                </form>
              </div>
            </Modal>
            <Sidebar setOpen={setOpen} />
            <Switch>
              <Route path="/room/:roomId/:roomName">
                <Chat />
              </Route>
            </Switch>
          </div>
        ) : (
          <>
            <Switch>
              <Route path="/register" exact>
                <SignUp />
              </Route>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
