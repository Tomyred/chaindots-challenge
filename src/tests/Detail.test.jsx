import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // Usando Vitest
import citiesStatus from '../mocks/5dayForecast.json';
import Detail from '../Pages/Detail/Detail';
import { WeatherContext } from '../context/WeatherContext/WeatherContext';
import * as ReactRouter from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';
import user from '../mocks/userMock.json'
import city from '../mocks/city.json'
import { forecastDefault } from '../context/WeatherContext/reducers/ForecastReducer';
import { cityDefault } from '../context/WeatherContext/reducers/CityReducer';
import { authDefault } from '../context/AuthContext/reducers/AuthReducer';

const mockDispatch = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
    MemoryRouter: actual.MemoryRouter,
  };
});

const renderWithContext = (forecastState = forecastDefault, cityState = cityDefault, authState = authDefault, dispatch = mockDispatch) => {
  return render(
    <WeatherContext.Provider
      value={{
        cityState,
        cityDispatch: dispatch,
        forecastState,
        forecastDispatch: dispatch,
      }}
    >
      <AuthContext.Provider
        value={{
          authState,
          authDispatch: dispatch,
        }}
      >
        <ReactRouter.MemoryRouter initialEntries={['/weather/detail/Alta Gracia']}>
          <Detail />
        </ReactRouter.MemoryRouter>
      </AuthContext.Provider>
    </WeatherContext.Provider>
  );
}

describe('Detail Component', () => {
  it('should update forecastState.data and match keys with measurement-container count', async () => {

    vi.mocked(ReactRouter.useLocation).mockReturnValue({ state: city });

    renderWithContext()

    await waitFor(() => {
      const measurementContainers = screen.queryAllByTestId('measurement-container');
      expect(measurementContainers.length).toBe(0);
    });

    const updatedForecastState = {
      loading: false,
      loaded: false,
      loadingError: false,
      data: citiesStatus
    }

    renderWithContext(updatedForecastState)

    await waitFor(() => {
      const measurementContainers = screen.queryAllByTestId('measurement-container');
      const forecastKeys = Object.keys(updatedForecastState.data);
      expect(measurementContainers.length).toBe(forecastKeys.length);
    });
  });

  it('should save city in localStorage key favorites', async () => {
    vi.mocked(ReactRouter.useLocation).mockReturnValue({ state: city });
  
    const updatedForecastState = { data: citiesStatus };
    renderWithContext(updatedForecastState);
  
    const favoritesBefore = JSON.parse(localStorage.getItem('favorites')) || [];
    expect(favoritesBefore.length).toBe(0);
  
    const addFavButton = screen.getByTestId('add-fav-button');
    addFavButton.click();
  
    await waitFor(() => {
      const favoritesAfter = JSON.parse(localStorage.getItem('favorites')) || [];
      expect(favoritesAfter.length).toBe(1);
    });
  });
});
