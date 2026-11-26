import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  it('renders the start screen', async () => {
    await render(<App />);

    expect(screen.getByText(/start working on your app/i)).toBeOnTheScreen();
  });
});
