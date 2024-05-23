import { render, screen } from '@testing-library/react';
import ObjectCard from '../ObjectCard';
import '@testing-library/jest-dom';
jest.mock('@/constants', () => ({
  getEclipseAddress: jest.fn((address) => address),
}));

describe('ObjectCard', () => {
  const object = {
    objectId: '123',
    type: 'mutated',
    owner: { AddressOwner: '0x1234567890abcdef' },
  };

  it('should render without crashing', () => {
    render(<ObjectCard object={object} />);
    expect(screen.getByText('Changes')).toBeInTheDocument();
  });

  it('should display the correct object type', () => {
    render(<ObjectCard object={object} />);
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('should display the correct object id', () => {
    render(<ObjectCard object={object} />);
    expect(screen.getByText(object.objectId)).toBeInTheDocument();
  });

  it('should display the correct owner address', () => {
    render(<ObjectCard object={object} />);
    expect(screen.getByText(object.owner.AddressOwner)).toBeInTheDocument();
  });
});
