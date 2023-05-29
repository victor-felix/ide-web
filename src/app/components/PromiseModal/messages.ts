import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  buttonCancelLabel: () =>
    _t(translations.components.promiseModal.buttonCancelLabel, 'Cancel'),
  buttonConfirmLabel: () =>
    _t(translations.components.promiseModal.buttonConfirmLabel, 'Confirm'),
};
