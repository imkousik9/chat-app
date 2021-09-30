import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import useMessage from '../lib/hooks/useMessage';

import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

function SidebarChat({ id, name }) {
  const messages = useMessage(id);

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  }

  return (
    <Link to={`/room/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p className="sidebarChat__seen">
            {messages[messages.length - 1]?.message &&
              truncateString(messages[messages.length - 1]?.message, 25)}
          </p>
          <p className="sidebarChat__seen">
            {+messages[messages?.length - 1]?.createdAt
              ? `Last Active: ${formatDistance(
                  new Date(+messages[messages?.length - 1]?.createdAt),
                  Date.now(),
                  {
                    addSuffix: true
                  }
                )}`
              : ''}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
