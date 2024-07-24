import { useSubscribers } from '../../hooks/use-subscribers';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { useState } from 'react';
import ToastMsg from '../toast-msg/toast-msg.component.tsx';
import EditQuotaModal from '../edit-quota-modal/modal.component.tsx';
import { Subscriber } from '../../domain/subscriber.ts';
import { SeverityToast } from '../../domain/severityToast.ts';


export default function SubscribersList() {
  const { subscribers, getSubscriberById, updateSubscriberQuota } = useSubscribers();

  const [openModal, setOpenModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState<SeverityToast>('success');
  const [toastMsg, setToastMsg] = useState('');
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);

  const showErrorToast = () => {
    setToastSeverity('danger');
    setToastMsg('Sorry, try later!');
    setOpenToast(true);
  };

  const showSuccessToast = (motive: string) => {
    setToastSeverity('success');
    setToastMsg(`The quota has been updated!\nThe motive is: ${motive}`); // TODO: I guess the motive should be persisted as well
    setOpenToast(true);
  };

  const onClickEditQuota = (id: string): void => {
    const sub = getSubscriberById(id);

    if (sub === undefined) {
      showErrorToast();
    } else {
      setSelectedSubscriber(sub);
      setOpenModal(true);
    }
  };

  const onSaveQuotaEdited = (id: string, quota: number, motive: string) => {
    try {
      updateSubscriberQuota(id, quota);
      showSuccessToast(motive);
    } catch {
      showErrorToast();
    }
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Quota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((sub) => (
              <TableRow
                onClick={() => onClickEditQuota(sub.id)}
                key={sub.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {sub.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {sub.name}
                </TableCell>
                <TableCell align="center">{sub.quota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastMsg isOpen={openToast} setIsOpen={setOpenToast} severity={toastSeverity} msg={toastMsg} />

      <EditQuotaModal isOpen={openModal} setIsOpen={setOpenModal} subscriber={selectedSubscriber}
                      onSave={onSaveQuotaEdited} />
    </>
  );
}
