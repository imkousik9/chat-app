import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { ROOM } from '../../graphql/queries';
import { DELETE_ROOM_SUBSCRIPTION } from '../../graphql/subscriptions';
import { useHistory } from 'react-router';

function useRoom(roomId) {
  const [room, setRoom] = useState(null);

  const history = useHistory();

  useQuery(ROOM, {
    variables: { id: roomId },
    onError: (err) => console.log(err),
    onCompleted(data) {
      setRoom(data?.room);
    }
  });

  useSubscription(DELETE_ROOM_SUBSCRIPTION, {
    onSubscriptionData() {
      history.replace('/');
    }
  });

  return room;
}

export default useRoom;
