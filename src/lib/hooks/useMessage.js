import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries';
import { NEW_MESSAGE } from '../../graphql/subscriptions';

function useMessage(roomId) {
  const [messages, setMessages] = useState([]);

  useQuery(GET_MESSAGES, {
    variables: { id: roomId },
    onError: (err) => console.log(err),
    onCompleted(data) {
      if (roomId === data?.messages[data?.messages.length - 1]?.room?.id)
        setMessages(data?.messages);
    }
  });

  useSubscription(NEW_MESSAGE, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (roomId === data?.newMessage.room?.id)
        setMessages([...messages, data?.newMessage]);
    }
  });

  return messages;
}

export default useMessage;
