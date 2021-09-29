import { gql } from '@apollo/client';

export const NEW_ROOM = gql`
  subscription NewRoom {
    newRoom {
      id
      name
    }
  }
`;

export const DELETE_ROOM = gql`
  subscription DeleteRoom {
    deleteRoom {
      id
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription NewMessage {
    newMessage {
      id
      message
      createdAt
      user {
        name
        email
      }
      room {
        id
      }
    }
  }
`;
