import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import citiesStatus from '../mocks/citiesStatus.json';
import Home from '../Pages/Home/Home';
import { MemoryRouter } from 'react-router';
import { WeatherContext } from '../context/WeatherContext/WeatherContext';

const mockDispatch = vi.fn();

const mockSearchCity = vi.fn();

const renderWithContext = (cityState, cityDispatch = mockDispatch) => {
  return render(
    <WeatherContext.Provider
      value={{
        cityState,
        cityDispatch,
      }}
    >
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </WeatherContext.Provider>
  );
};

vi.mock('../../context/WeatherContext/actions/cityActions', () => ({
  searchCity: mockSearchCity,
}));

describe('Home Component', () => {
  it('renders WeatherCards after searching for a city', async () => {
    renderWithContext({ data: [], loading: false });

    const searchInput = screen.getByTestId('search-input').querySelector('input');;

    const cardsBeforeSearch = screen.queryAllByTestId('city-card');
    expect(cardsBeforeSearch).toHaveLength(0);

    fireEvent.input(searchInput, { target: { value: 'New York' } });

    await waitFor(() => {
      mockDispatch();
    });

    renderWithContext({ data: citiesStatus, loading: false });

    const cardsAfterSearch = screen.queryAllByTestId('city-card');
    expect(cardsAfterSearch).toHaveLength(citiesStatus.length);
  });
});
