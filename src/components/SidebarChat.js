import { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import { Link } from 'react-router-dom';

import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

function SidebarChat({ id, name }) {
  const [seed, setSeed] = useState('');
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

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/room/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[messages.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
