import { Fragment } from 'react';
import { IconButton } from '@mui/material';
import { Close as CloseIcon}  from '@mui/icons-material';
import {Snackbar} from '@mui/joy';
import { SeverityToast } from '../../domain/severityToast';

interface ToastMsgProps {
  isOpen: boolean;
  setIsOpen: (shouldOpenToast: boolean) => void;
  severity: SeverityToast;
  msg: string;
}

export default function ToastMsg(props: ToastMsgProps) {
  const { isOpen, setIsOpen, severity, msg } = props;

  const handleClose = () => {
    setIsOpen(false);
  };

  const closeBtn = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (

    <Snackbar
      autoHideDuration={6000}
      color={severity}
      size="md"
      variant="solid"
      anchorOrigin={{ vertical:'top', horizontal:'right' }}
      open={isOpen}
      onClose={handleClose}
      endDecorator={closeBtn}
    >
      {msg}
    </Snackbar>
  );
}
