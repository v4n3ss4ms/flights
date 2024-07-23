import { Modal, ModalDialog, ModalClose, IconButton, Option, Select, Button } from '@mui/joy';
import { Subscriber } from '../../domain/subscriber.ts';
import { Box } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';

interface EditQuotaModalProps {
  isOpen: boolean;
  setIsOpen: (shouldOpenModal: boolean) => void;
  subscriber: Subscriber | null;
  onSave: (id: string, quota: number, motive: string) => void;
}

enum ChangeQuota {
  add = 'add',
  remove = 'remove',
}

export default function EditQuotaModal(props: EditQuotaModalProps) {
  const { isOpen, setIsOpen, subscriber, onSave } = props;
  const [updatedQuota, setUpdatedQuota] = useState(0);
  const [motive, setMotive] = useState('');
  const MIN_FLIGHTS = 0; // TODO: this business magic should be in a constants file or properties file
  const MAX_FLIGHTS = 3; // TODO: this business magic should be in a constants file or properties file

  useEffect(() => {
    if (subscriber) {
      setUpdatedQuota(subscriber.quota);
    }
  }, [subscriber]);


  const onHandleMotiveChange = (
    event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (newValue) {
      setMotive(newValue);
    }
  };

  const onHandleQuotaChange = (operation: ChangeQuota) => {
    const newQuota = operation === ChangeQuota.remove ? updatedQuota - 1 : updatedQuota + 1;
    setUpdatedQuota(newQuota);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(subscriber?.id || '', updatedQuota, motive);
    setIsOpen(false);
  };

  if (!subscriber) {
    return null;
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      open={isOpen}
      onClose={() => setIsOpen(false)}>
      <ModalDialog
        color="neutral"
        layout="center"
        size="lg"
        variant="plain"
      >
        <ModalClose />
        <h2 id="modal-title">Edit flights</h2>
        <p id="modal-description">Add or remove flights from the subscriber ({subscriber.name})</p>


        <form
          onSubmit={(event) => onSubmit(event)}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={4}
          >
            <IconButton aria-label="Remove flight" disabled={updatedQuota === MIN_FLIGHTS}
                        onClick={() => onHandleQuotaChange(ChangeQuota.remove)}><RemoveCircleIcon /></IconButton>
            {updatedQuota}
            <IconButton aria-label="Add flight" disabled={updatedQuota === MAX_FLIGHTS}
                        onClick={() => onHandleQuotaChange(ChangeQuota.add)}><AddCircleIcon /></IconButton>
            <Select
              name="motive"
              placeholder="What is the motive?"
              aria-label="Change motive"
              size="md"
              variant="outlined"
              required
              onChange={onHandleMotiveChange}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Box>
          <Box
            alignItems="center"
          >
            <Button type="submit" disabled={!motive || (updatedQuota === subscriber?.quota)}>Save changes</Button>
          </Box>
        </form>
      </ModalDialog>
    </Modal>
  );
}

