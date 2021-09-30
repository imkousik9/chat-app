import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries';
import { NEW_MESSAGE } from '../../graphql/subscriptions';

function useMessages(roomId) {
  const [messages, setMessages] = useState([]);

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

  return messages;
}

export default useMessages;
