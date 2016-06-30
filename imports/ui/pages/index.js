import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import UsersList from '../containers/users-list';

export const Index = () => (
  <Jumbotron className="text-center">
    <h2>Accueil</h2>
    <UsersList />
  </Jumbotron>
);
