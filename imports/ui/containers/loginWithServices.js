import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { LoginWithServices } from '../components/loginWithServices';
import { composeWithTracker } from 'react-komposer';

const composer = (params, onData) => {
onData(null, Accounts.loginServicesConfigured());
};

export default composeWithTracker(composer, Loading)(LoginWithServices);