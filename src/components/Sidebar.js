import { useAuth } from '../store/StateProvider';
import useRooms from '../lib/hooks/useRooms';
import { useHistory } from 'react-router-dom';

import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

import './Sidebar.css';

function Sidebar({ setOpen }) {
  const [{ user }, dispatch] = useAuth();
  const history = useHistory();

  const rooms = useRooms();

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
