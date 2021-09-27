import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';

import { useAuth } from '../store/StateProvider';
import { ROOMS } from '../graphql/queries';
import { NEW_ROOM, DELETE_ROOM } from '../graphql/subscriptions';
import { CREATE_ROOM } from '../graphql/mutations';

import { useHistory } from 'react-router-dom';

import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

import './Sidebar.css';

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  const [{ user }, dispatch] = useAuth();

  const history = useHistory();

  const [addRoom] = useMutation(CREATE_ROOM);

  useQuery(ROOMS, {
    onError: (err) => console.log(err),
    onCompleted(data) {
      setRooms(data?.rooms);
    }
  });

  useSubscription(NEW_ROOM, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setRooms([...rooms, data?.newRoom]);
    }
  });

  useSubscription(DELETE_ROOM, {
    onSubscriptionData({ subscriptionData: { data } }) {
      const result = rooms.filter((room) => room.id !== data?.deleteRoom.id);
      setRooms([...result]);
    }
  });

  const createRoom = async () => {
    const roomName = prompt('Please enter name for chat');

    if (roomName) {
      await addRoom({ variables: { name: roomName } });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar alt={user?.name} src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton onClick={createRoom}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch({ type: 'LOGOUT_SUCCESS' });
              history.replace('/');
            }}
          >
            <ExitToAppRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
