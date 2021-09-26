import { gql } from '@apollo/client';

export const ROOMS = gql`
  query GetRooms {
    rooms {
      id
      name
    }
  }
`;

export const ROOM = gql`
  query GetRoom($id: ID) {
    room(id: $id) {
      id
      name
    }
  }
`;

export const USER = gql`
  query User {
    user {
      name
      email
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($id: ID) {
    messages(id: $id) {
      id
      message
      createdAt
      user {
        name
      }
    }
  }
`;
