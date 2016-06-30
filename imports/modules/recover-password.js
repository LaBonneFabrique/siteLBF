import $ from 'jquery';
import 'jquery-validation';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;

const handleRecovery = () => {
  Accounts.forgotPassword({
    email: getInputValue(component.refs.emailAddress),
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Le lien a été envoyé avec succès!', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.recoverPassword).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Merci de renseigner l\'adresse mail.',
        email: 'Cette adresse ne semble pas valide',
      },
    },
    submitHandler() { handleRecovery(); },
  });
};

export const handleRecoverPassword = (options) => {
  component = options.component;
  validate();
};
