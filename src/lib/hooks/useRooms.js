import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { ROOMS } from '../../graphql/queries';
import {
  DELETE_ROOM_SUBSCRIPTION,
  NEW_ROOM
} from '../../graphql/subscriptions';

function useRooms() {
  const [rooms, setRooms] = useState([]);

  useQuery(ROOMS, {
    onError: (err) => console.log(err),
    onCompleted(data) {
      setRooms(data?.rooms);
    }
  });

  useSubscription(NEW_ROOM, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setRooms([...rooms, data?.newRoom]);
    }
  });

  useSubscription(DELETE_ROOM_SUBSCRIPTION, {
    onSubscriptionData({ subscriptionData: { data } }) {
      const result = rooms.filter((room) => room.id !== data?.deleteRoom.id);
      setRooms([...result]);
    }
  });

  return rooms;
}

export default useRooms;
