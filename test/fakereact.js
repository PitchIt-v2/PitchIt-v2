import '@testing-library/react';
import React from 'React';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Link,
  Route,
  Routes,
  BrowserRouter,
  MemoryRouter,
} from 'react-router-dom';

import App from '../client/App.jsx';

describe('Testing react router', () => {
  describe('Full app rendering/navigating', () => {
    // render in the entire app to begin with
    beforeAll(() => {
      let app = render(<App />, { wrapper: MemoryRouter });
    });

    test('The login page is served at the root', () => {
      const loginPage = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Pitch It');
    });
  });
});

// describe('ButtonLogin', () => {
//     test('should pass', () => {
//       const history = createMemoryHistory({ initialEntries: ['/home'] });
//       const { getByText } = render(
//         <Router history={history}>
//           <ButtonLogin />
//         </Router>
//       );
//       expect(history.location.pathname).toBe('/home');
//       fireEvent.click(getByText('Iniciar sesión'));
//       expect(history.location.pathname).toBe('/login');
//     });
//   });

// est('current user is active in sidebar', () => {
//   render(
//     <MemoryRouter initialEntries={['/users/2']}>
//       <Sidebar />
//     </MemoryRouter>
//   );
//   expectUserToBeActive(2);
// });
