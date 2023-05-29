import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { PromiseModal } from 'app/components/PromiseModal';
import * as React from 'react';
import { File } from '../../slice/types';
import { useTranslation } from 'react-i18next';
import { messages } from 'app/pages/EditorPage/messages';
import { useDispatch } from 'react-redux';
import { useEditorSlice } from '../../../Editor/slice';

interface DeleteFileModalProps {
  file: File;
}

export default function DeleteFileModal({ file }: DeleteFileModalProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useEditorSlice();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickDelete = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (result: boolean) => {
    if (result) {
      dispatch(actions.deleteFile(file.id));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" size="small" onClick={handleClickDelete}>
        <Delete fontSize="small" color="disabled" />
      </IconButton>
      <PromiseModal
        open={isModalOpen}
        title={t(messages.modalDeleteTitle())}
        content={t(messages.modalDeleteContent())}
        onClose={handleCloseModal}
      />
    </div>
  );
}
