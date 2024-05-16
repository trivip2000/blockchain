import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../pages/Homepage/Form';
import { MockedProvider } from '@apollo/client/testing';
// import { MY_QUERY } from './queries'; // replace with the actual path to your query
// import { SubmitHandler } from 'react-hook-form';
// import
const mockRefetch = jest.fn();
jest.mock('@apollo/client', () => ({
  useQuery: () => ({
    refetch: mockRefetch,
  }),
}));

test('renders and submits form', async () => {
  //   const onSubmit: SubmitHandler<Inputs> = jest.fn();
  const { getByText, container } = render(<App />);

  const firstNameInput = container.querySelector(`input[name="firstName"]`);
  const lastNameInput = container.querySelector(`input[name="lastName"]`);
  const submitButton = getByText('Submit');
  if (!firstNameInput || !lastNameInput) {
    throw new Error('Could not find input with name "firstName"');
  }
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.click(submitButton);
  const consoleSpy = jest.spyOn(console, 'log');
  await waitFor(() =>
    expect(consoleSpy).toHaveBeenCalledWith({ firstName: 'John', lastName: 'Doe' }, '213213213'),
  );
  consoleSpy.mockRestore();
});

describe('Form', () => {
  it('calls refetch when form is submitted', async () => {
    const { getByText, container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App refetch={mockRefetch} />
      </MockedProvider>,
    );
    const lastNameInput = container.querySelector(`input[name="lastName"]`);
    if (!lastNameInput) {
      throw new Error('Could not find input with name "firstName"');
    }
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    const submitButton = getByText('Submit');
    // Simulate form submission
    fireEvent.click(submitButton);
    // Check that refetch was called
    await waitFor(() => expect(mockRefetch).toHaveBeenCalled());
  });
});
