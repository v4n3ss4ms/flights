import { render, screen, fireEvent } from '@testing-library/react';
import ToastMsg from './toast-msg.component';
import { SeverityToast } from '../../domain/severityToast.ts';

const AN_IRRELEVANT_MSG = 'AN_IRRELEVANT_MSG';

const DEFAULT_PROPS = {
  isOpen: true,
  setIsOpen: jest.fn(),
  severity: 'success' as SeverityToast,
  msg: AN_IRRELEVANT_MSG,
};


describe('ToastMsg Component', () => {
  it('should render the Snackbar with the correct message', () => {
    render(<ToastMsg {...DEFAULT_PROPS} />);

    expect(screen.getByText(AN_IRRELEVANT_MSG)).toBeInTheDocument();
  });

  it('should call setIsOpen when close button is clicked', () => {
    render(<ToastMsg {...DEFAULT_PROPS} />);

    fireEvent.click(screen.getByLabelText(/close/i));

    expect(DEFAULT_PROPS.setIsOpen).toHaveBeenCalledWith(false);
  });
});
