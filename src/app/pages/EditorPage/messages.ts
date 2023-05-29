import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  sectionEditor: () =>
    _t(
      translations.pages.editorPage.features.configurations.sectionEditor,
      'Text Editor',
    ),
  fontSizeLabel: () =>
    _t(translations.pages.editorPage.features.configurations.fontSizeLabel),
  textEditorThemeLabel: () =>
    _t(
      translations.pages.editorPage.features.configurations
        .textEditorThemeLabel,
    ),
  tabSizeLabel: () =>
    _t(translations.pages.editorPage.features.configurations.tabSizeLabel),
  sectionIde: () =>
    _t(translations.pages.editorPage.features.configurations.sectionIde),
  modeLabel: () =>
    _t(translations.pages.editorPage.features.configurations.modeLabel),
  languageLabel: () =>
    _t(translations.pages.editorPage.features.configurations.languageLabel),
  showLineNumbersLabel: () =>
    _t(
      translations.pages.editorPage.features.configurations
        .showLineNumbersLabel,
    ),
  modeOption: (mode: string) =>
    _t(translations.pages.editorPage.features.configurations.mode[mode]),
  editorPlaceholder: () =>
    _t(translations.pages.editorPage.features.editor.placeholder),
  projectLabel: () =>
    _t(translations.pages.editorPage.features.treeview.projectLabel),
  modalDeleteTitle: () =>
    _t(
      translations.pages.editorPage.features.treeview.components.deleteFileModal
        .title,
    ),
  modalDeleteContent: () =>
    _t(
      translations.pages.editorPage.features.treeview.components.deleteFileModal
        .content,
    ),
};
