import '@testing-library/react';
import React from 'React';
import { unmountComponentAtNode } from 'react-dom';
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

// Test the login/signup page
describe('Login', () => {
  let login = null;
  beforeEach(async () => {
    login = await render(
      <MemoryRouter intialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });
  test('There should be two input fields', () => {
    // Login field
    const username = screen.getByPlaceholderText('Username');
    const password = screen.getByPlaceholderText('Password');
    expect(username);
    expect(password);
  });

  test('clicking login with invalid inputs renders text', async () => {
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    const errorText = document.getElementsByClassName('input-error');
    expect(errorText[0]).toHaveTextContent(
      'Please enter a valid username and password'
    );
  });

  test('clicking Sign Up should reroute you to the next page', async () => {
    const signUp = screen.getByText('Sign Up');
    await fireEvent.click(signUp);
    const signUpButton = screen.getAllByRole('button');
    expect(signUpButton.length).toBe(1);
  });
});

describe('Homepage', () => {
  let home = null;

  beforeEach(async () => {
    home = await render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
  });
  // afterEach(() => {
  //   unmountComponentAtNode(home);
  //   home.remove();
  //   home = null;
  // });

  describe('The home page should render when you login', () => {
    test('It should have Pitches', () => {
      const container = document.getElementById('Home');
      expect(container).toHaveTextContent('Pitches');
    });
  });
  describe('Home page should have a working filter button', () => {
    test('Filter button render', () => {
      const filterButton = home.getByRole('button');
      expect(filterButton).toHaveTextContent('Filter');
    });
    test('Filter button click should render in 21 more buttons', async () => {
      const filterButton = home.getByRole('button');
      await fireEvent.click(filterButton);
      const allButtons = home.getAllByRole('button');
      expect(allButtons.length).toBe(22);
    });
  });
});

describe('My pages should render', () => {
  let myPitches = null;

  beforeEach(async () => {
    myPitches = await render(
      <MemoryRouter initialEntries={['/myprojects']}>
        <App />
      </MemoryRouter>
    );
  });
  test('It should have My Pitches', () => {
    const header = document.getElementsByClassName('myproject-header');
    expect(header[0]).toHaveTextContent('My Pitches');
  });
  test('It should have a Pitch a new project! button', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Pitch a new project!');
  });
  test('The button should reroute you', async () => {
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveTextContent('Create Pitch');
  });
});

describe('Create page testing', () => {
  let create;

  beforeEach(async () => {
    create = await render(
      <MemoryRouter initialEntries={['/create']}>
        <App />
      </MemoryRouter>
    );
  });

  test('Test if everything on page renders', () => {
    const title = screen.getByPlaceholderText('Enter a title for your project');
    const description = screen.getByPlaceholderText(
      'Enter a short description of your project'
    );
    expect(title);
    expect(description);
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.length).toBe(22);
  });

  test('Test if text renders when you type in input boxes', async () => {
    const title = screen.getByPlaceholderText('Enter a title for your project');
    const description = screen.getByPlaceholderText(
      'Enter a short description of your project'
    );

    fireEvent.change(title, { target: { value: 'a' } });
    fireEvent.change(description, { target: { value: 'b' } });
    console.log(title);
    expect(title.value).toBe('a');
    expect(description.value).toBe('b');
  });
});

// test('change values via the fireEvent.change method', () => {
//     const handleChange = jest.fn()
//     const {container} = render(<input type="text" onChange={handleChange} />)
//     const input = container.firstChild
//     fireEvent.change(input, {target: {value: 'a'}})
//     expect(handleChange).toHaveBeenCalledTimes(1)
//     expect(input.value).toBe('a')
//   })
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
