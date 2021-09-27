import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
        email
        token
      }
      errors {
        field
        message
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      user {
        name
        email
        token
      }
      errors {
        field
        message
      }
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation DeleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($message: String, $roomId: ID) {
    sendMessage(message: $message, roomId: $roomId) {
      id
    }
  }
`;
