import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import { useAuth } from '../store/StateProvider';
import { ROOMS } from '../graphql/queries';
import { NEW_ROOM, DELETE_ROOM } from '../graphql/subscriptions';

import { useHistory } from 'react-router-dom';

import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

import './Sidebar.css';

function Sidebar({ setOpen }) {
  const [rooms, setRooms] = useState([]);

  const [{ user }, dispatch] = useAuth();
  const history = useHistory();

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

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          alt={user?.name}
          src={`https://avatars.dicebear.com/api/bottts/${user?.name}.svg`}
        />

        <div className="sidebar__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => setOpen(true)}>
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

      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
