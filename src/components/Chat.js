import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { DELETE_ROOM, SEND_MESSAGE } from '../graphql/mutations';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';

function Chat() {
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);

  const [addMessage] = useMutation(SEND_MESSAGE);
  const [deleteRoom] = useMutation(DELETE_ROOM);

  const { roomId, roomName } = useParams();
  const history = useHistory();

  useQuery(GET_MESSAGES, {
    variables: { id: roomId },
    onError: (err) => console.log(err),
    onCompleted(data) {
      setMessages(data?.messages);
    }
  });

  useSubscription(NEW_MESSAGE, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setMessages([...messages, data?.newMessage]);
    }
  });

  const handleDelete = async () => {
    if (roomId) {
      await deleteRoom({ variables: { id: roomId } });
      history.replace('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (roomId) {
      await addMessage({
        variables: { message: input, roomId: roomId },
        onError: (err) => console.log(err)
      });
    }

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {+messages[messages?.length - 1]?.createdAt
              ? formatDistance(
                  new Date(+messages[messages?.length - 1]?.createdAt),
                  Date.now(),
                  {
                    addSuffix: true
                  }
                )
              : ''}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton onClick={handleDelete} className="chat__headerRight--red">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <ScrollToBottom className="chat__body">
        {messages.map((message) => (
          <Message key={message?.id} message={message} />
        ))}
      </ScrollToBottom>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
