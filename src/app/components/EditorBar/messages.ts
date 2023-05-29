import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  applicationName: () =>
    _t(translations.components.editorBar.applicationName, 'My Java IDE'),
};
