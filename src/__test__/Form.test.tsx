import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './../Form';
// import { SubmitHandler } from 'react-hook-form';
// import

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
