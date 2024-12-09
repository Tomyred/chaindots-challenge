import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // Usando Vitest
import citiesStatus from '../mocks/5dayForecast.json';
import Detail from '../Pages/Detail/Detail';
import { WeatherContext } from '../context/WeatherContext/WeatherContext';
import * as ReactRouter from 'react-router';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
    MemoryRouter: actual.MemoryRouter,
  };
});

describe('Detail Component', () => {
  it('should update forecastState.data and match keys with measurement-container count', async () => {
    const initialForecastState = { data: {} };

    const mockState = { lat: 40.7128, lon: -74.0060 };
    vi.mocked(ReactRouter.useLocation).mockReturnValue({ state: mockState });

    render(
      <WeatherContext.Provider
        value={{
          forecastState: initialForecastState,
          forecastDispatch: vi.fn(),
        }}
      >
        <ReactRouter.MemoryRouter initialEntries={['/weather/detail/New York']}>
          <Detail />
        </ReactRouter.MemoryRouter>
      </WeatherContext.Provider>
    );

    await waitFor(() => {
      const measurementContainers = screen.queryAllByTestId('measurement-container');
      expect(measurementContainers.length).toBe(0);
    });

    const updatedForecastState = { data: citiesStatus };
    render(
      <WeatherContext.Provider
        value={{
          forecastState: updatedForecastState,
          forecastDispatch: vi.fn(),
        }}
      >
        <ReactRouter.MemoryRouter initialEntries={['/weather/detail/New York']}>
          <Detail />
        </ReactRouter.MemoryRouter>
      </WeatherContext.Provider>
    );

    await waitFor(() => {
      const measurementContainers = screen.queryAllByTestId('measurement-container');
      const forecastKeys = Object.keys(updatedForecastState.data);
      expect(measurementContainers.length).toBe(forecastKeys.length);
    });
  });
});
