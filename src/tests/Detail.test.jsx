import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // Usando Vitest
import citiesStatus from '../mocks/5dayForecast.json';
import Detail from '../Pages/Detail/Detail';
import { WeatherContext } from '../context/WeatherContext/WeatherContext';
import * as ReactRouter from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';
import user from '../mocks/userMock.json'

const mockDispatch = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
    MemoryRouter: actual.MemoryRouter,
  };
});

const renderWithContext = (state, dispatch = mockDispatch) => {
  const initialForecastState = state;
  const initialCityState = { data: [] };
  const initialAuthState =  {
        "loading": false,
        "loaded": true,
        "loadingError": false,
        "user": user,
        "registerError": "",
        "loginError": ""
    }

  return render(
    <WeatherContext.Provider
      value={{
        cityState: initialCityState,
        forecastState: initialForecastState,
        forecastDispatch: dispatch,
      }}
    >
      <AuthContext.Provider
        value={{
          authState: initialAuthState,
          authDispatch: dispatch,
        }}
      >
        <ReactRouter.MemoryRouter initialEntries={['/weather/detail/New York']}>
          <Detail />
        </ReactRouter.MemoryRouter>
      </AuthContext.Provider>
    </WeatherContext.Provider>
  );
}

describe('Detail Component', () => {
  it('should update forecastState.data and match keys with measurement-container count', async () => {


    const mockState = { lat: 40.7128, lon: -74.0060 };
    vi.mocked(ReactRouter.useLocation).mockReturnValue({ state: mockState });
    const initForecastState = { data: {} }
    renderWithContext(initForecastState)

    await waitFor(() => {
      mockDispatch();
      const measurementContainers = screen.queryAllByTestId('measurement-container');
      expect(measurementContainers.length).toBe(0);
    });

    const updatedForecastState = { data: citiesStatus };

    renderWithContext(updatedForecastState)
  

    await waitFor(() => {
      const measurementContainers = screen.queryAllByTestId('measurement-container');
      const forecastKeys = Object.keys(updatedForecastState.data);
      expect(measurementContainers.length).toBe(forecastKeys.length);
    });
  });
});
