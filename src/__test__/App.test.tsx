import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Home from "./../App";
jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ "test":'2132131' }),
}))
describe('Home component', () => {
  it('should render "Loading..." while data is fetching', async () => {
    // Mock useSWR to return an empty promise (simulating loading)
    jest.mock('swr', () => ({
      useSWR: jest.fn().mockReturnValue({ data: null, error: null, isLoading: true }),
    }));

    render(<Home />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('should render a list of users when data is fetched successfully', async () => {
    // Mock useSWR to return mock user data
    const mockUsers = [{ name: 'Alice' }, { name: 'Bob' }];
    jest.mock('swr', () => ({
      useSWR: jest.fn().mockReturnValue({ data: mockUsers, error: null, isLoading: false }),
    }));

    render(<Home />);
    screen.debug()
    const userNames = screen.queryAllByRole('heading', { level: 2 });
    expect(userNames.length).toBe(mockUsers.length);
    expect(userNames[0]).toHaveTextContent(mockUsers[0].name); // Check first user name
    expect(userNames[1]).toHaveTextContent(mockUsers[1].name); // Check second user name
  });
  it('should render an error message on fetch failure', async () => {
    // Mock useSWR to return an error
    const error = new Error('Failed to fetch users');
    jest.mock('swr', () => ({
      useSWR: jest.fn().mockReturnValue({ data: null, error, isLoading: false }),
    }));

    render(<Home />);

    expect(screen.getByText('Failed to fetch users.')).toBeInTheDocument();
  });

  // Add more tests for successful data loading and user rendering...
  
});