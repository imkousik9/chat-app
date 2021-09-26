import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from './store/StateProvider';
import { USER } from './graphql/queries';

import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import SignUp from './components/SignUp';

import './App.css';

function App() {
  const [{ isAuthenticated }, dispatch] = useAuth();

  useQuery(USER, {
    onError: (err) => console.log(err),
    onCompleted(data) {
      const meData = {
        email: data?.user.email,
        name: data?.user.name
      };
      dispatch({
        type: 'SET_USER',
        user: meData
      });
    }
  });

  return (
    <div className="app">
      <Router>
        <Switch>
          {isAuthenticated ? (
            <div className="app__body">
              <Sidebar />
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              {/* <Route path="/"><Chat /></Route> */}
            </div>
          ) : (
            <>
              <Route path="/register" exact>
                <SignUp />
              </Route>
              <Route path="/" exact>
                <Login />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
