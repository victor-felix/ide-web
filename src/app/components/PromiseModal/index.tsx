import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

interface PromiseModalProps {
  open: boolean;
  title: string;
  content: string;
  onClose: (result: boolean) => void;
}

export function PromiseModal({
  open,
  title,
  content,
  onClose,
}: PromiseModalProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleConfirm = () => {
    setIsOpen(false);
    onClose(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onClose(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {t(messages.buttonCancelLabel())}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {t(messages.buttonConfirmLabel())}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
