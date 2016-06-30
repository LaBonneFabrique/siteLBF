import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app';
import { Documents } from '../../ui/pages/documents';
import { Index } from '../../ui/pages/index';
//import { Login } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
//import { Signup } from '../../ui/pages/signup';
import { planningAgenda } from '../../ui/pages/agenda';
import { testEnregistrement } from '../../ui/pages/testEnregistrement';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import PageAdherent from '../../ui/containers/pageAdherent';


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="accueil" component={ Index } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ requireAuth } />
        <Route name="pageAdherent" path="/pageAdherent" component={ PageAdherent } onEnter={ requireAuth } />
        <Route path="/signin" component={ Accounts.ui.LoginForm } formState={ STATES.SIGN_IN } />
        <Route name="recover-password" path="/oubliMDP" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="agenda" path="/agenda" component={ planningAgenda } />
        <Route name="testEnregistrement" path="/test" component = { testEnregistrement } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
