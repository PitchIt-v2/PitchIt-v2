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
    // beforeAll(() => {
    //   let app = render(<App />);
    // });

    // Window.alert mock
    window.alert = jest.fn();

    // Maybe these tests could have been implemented with iteration?
    test('The login page is served at the root', () => {
      const loginPage = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Pitch It');
    });
    test('The sign up page is served', () => {
      const signup = render(
        <MemoryRouter initialEntries={['/signup']}>
          <App />
        </MemoryRouter>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Sign Up');
    });
    test('The home page is served', () => {
      const homePage = render(
        <MemoryRouter initialEntries={['/home']}>
          <App />
        </MemoryRouter>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Filter');
    });
    test('My Projects is served', () => {
      const myProjects = render(
        <MemoryRouter initialEntries={['/myprojects']}>
          <App />
        </MemoryRouter>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Pitch a new project!');
    });
  });
});
//end of react router testing

describe('Homepage', () => {
  let home;
  // beforeEach(async () => {
  //   home = await render(
  //     <MemoryRouter initialEntries={['/home']}>
  //       <App />
  //     </MemoryRouter>
  //   );
  // });

  describe('My Pitches should render when you login', () => {
    test('It should have Pitches', () => {
      const homeRender = render(
        <MemoryRouter initialEntries={['/home']}>
          <App />
        </MemoryRouter>
      );
      console.log(homeRender);
      const header = homeRender.getByText('Pitches');
      expect(header).toHaveTextContent('Pitches');
    });
  });
});
//   describe('Cards should render when you login', () => {
//     const filter = screen.getByRole('button');
//     expect(filter).toHaveTextContent('Filter');
//   });
// });
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
