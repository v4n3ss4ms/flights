import { fireEvent, render, screen } from '@testing-library/react';
import EditQuotaModal from './modal.component';

const DEFAULT_PROPS = {
  isOpen: true,
  setIsOpen: jest.fn(),
  subscriber: { id: '1', name: 'A_NAME', quota: 1 },
  onSave: jest.fn(),
};


describe('EditQuotaModal Component', () => {
  it('should render modal with subscriber data', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} />);
    expect(screen.getByLabelText('Change motive')).toBeInTheDocument();
  });

  it('should render the correct initial quota', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should increase quota when add button is clicked', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByLabelText('Add flight'));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should decrease quota when remove button is clicked', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByLabelText('Remove flight'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should disable the add button when quota is at MAX_FLIGHTS', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} subscriber={{ id: '1', name: 'A_NAME', quota: 3 }} />);
    expect(screen.getByLabelText('Add flight')).toBeDisabled();
  });

  it('should disable the remove button when quota is at MIN_FLIGHTS', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} subscriber={{ id: '1', name: 'A_NAME', quota: 0 }} />);
    expect(screen.getByLabelText('Remove flight')).toBeDisabled();
  });

  it('should enable save button when quota is changed and motive is selected',() => {
    render(<EditQuotaModal {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByLabelText('Add flight'));
    fireEvent.click(screen.getByLabelText('Change motive'));
    fireEvent.click(screen.getByText('Customer compensation'));

    expect(screen.getByLabelText('Save changes')).not.toBeDisabled();
  });

  it('should call onSave with correct arguments on form submit', () => {
    render(<EditQuotaModal {...DEFAULT_PROPS} />);
    fireEvent.click(screen.getByLabelText('Remove flight'));
    fireEvent.click(screen.getByLabelText('Change motive'));
    fireEvent.click(screen.getByText('Other'));
    fireEvent.click(screen.getByLabelText('Save changes'));

    expect(DEFAULT_PROPS.onSave).toHaveBeenCalledWith('1', 0, 'Other');
  });
});
