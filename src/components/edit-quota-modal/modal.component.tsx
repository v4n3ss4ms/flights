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

  // TODO: these business magic numbers should be in a constants file or properties file
  const MIN_FLIGHTS = 0;
  const MAX_FLIGHTS = 3;

  // TODO: these business magic strings arrays should be used through CMS keys in order to have i18n
  const ADD_FLIGHT_MOTIVES_LIST = ['Subscriber canceled flight', 'Airline canceled flight', 'Customer compensation', 'Other'];
  const REMOVE_FLIGHT_MOTIVES_LIST = ['Flight not redeposited after a flight cancellation', 'Subscriber had log in or password issues', 'Subscriber had issues when booking', 'Subscription has not renewed correctly', 'Other'];

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

  const isQuotaChanged = () => !(updatedQuota === subscriber?.quota);
  const isSubmitDisabled = () => !motive || !isQuotaChanged();

  const getMotives = () => {
    const isAdding = (updatedQuota - (subscriber?.quota ?? 0)) > 0;
    const isRemoving = (updatedQuota - (subscriber?.quota ?? 0)) < 0;

    if (isAdding) {
      return ADD_FLIGHT_MOTIVES_LIST;
    }
    if (isRemoving) {
      return REMOVE_FLIGHT_MOTIVES_LIST;
    }

    return [];
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
            sx={{ marginTop: 2 }}
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
              disabled={!isQuotaChanged()}
              sx={{ width: 400 }}
            >
              {getMotives().map(motive => {
                return <Option value={motive} key={motive}>{motive}</Option>;
              })}
            </Select>
          </Box>

          <Button
            aria-label="Save changes"
            fullWidth={true}
            sx={{ marginTop: 5 }}
            type="submit"
            disabled={isSubmitDisabled()}
          >
            Save changes
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
}

