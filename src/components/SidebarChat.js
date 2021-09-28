import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

function SidebarChat({ id, name }) {
  const [messages, setMessages] = useState([]);

  useQuery(GET_MESSAGES, {
    variables: { id: id },
    onError: (err) => console.log(err),
    onCompleted(data) {
      if (id === data?.messages[data?.messages.length - 1]?.room?.id)
        setMessages(data?.messages);
    }
  });

  useSubscription(NEW_MESSAGE, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (id === data?.newMessage.room?.id)
        setMessages([...messages, data?.newMessage]);
    }
  });

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
                  Date.now()
                )}`
              : ''}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
