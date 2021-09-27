import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

function SidebarChat({ id, name }) {
  const [seed, setSeed] = useState('');
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      // db.collection('rooms')
      //   .doc(id)
      //   .collection('messages')
      //   .orderBy('timestamp', 'desc')
      //   .onSnapshot((snapshot) => {
      //     setMessages(snapshot.docs.map((doc) => doc.data()));
      //   });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/room/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {/* <p>{messages[0]?.message}</p> */}
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
