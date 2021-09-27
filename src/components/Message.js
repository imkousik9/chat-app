import { formatDistance } from 'date-fns';

import { useAuth } from '../store/StateProvider';

import './Message.css';

const Message = ({ message }) => {
  const [{ user }] = useAuth();

  return (
    <p
      className={`message ${
        message?.user.email === user.email ? 'message__receiver' : ''
      } `}
    >
      <span
        className={`message__name ${
          message?.user.email === user.email ? 'message__name--none' : ''
        }`}
      >
        {message?.user.name}
      </span>
      {message?.message}
      <span className="message__timestamp">
        {formatDistance(new Date(+message?.createdAt), Date.now(), {
          addSuffix: true
        })}
      </span>
    </p>
  );
};

export default Message;
