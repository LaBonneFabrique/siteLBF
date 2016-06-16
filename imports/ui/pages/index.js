import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import UsersList from '../containers/users-list';

export const Index = () => (
  <Jumbotron className="text-center">
    <h2>Base</h2>
    <UsersList />
    <p>A starting point for Meteor applications.</p>
    <p><a className="btn btn-success" href="https://themeteorchef.com/base" role="button">Read the Documentation</a></p>
    <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v4.2.0</p>
  </Jumbotron>
);
