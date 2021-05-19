import { AuthProvider } from '../contexts/AuthContext';
import Signup from './Auth/Signup'
import Profile from './Auth/Profile'
import Login from './Auth/Login'
import PrivateRoute from './Auth/PrivateRoute'
import ForgotPassword from './Auth/ForgotPassword'
import {BrowserRouter as Router,
        Switch,
        Route
      } from 'react-router-dom'
import UpdateProfile from './Auth/UpdateProfile';
import Dashboard from './Drive/Dashboard'


function App() {
  return (
    <div className="App">
              <Router>
                  <AuthProvider>
                    <Switch>
                      {/* DriveRoutes */}
                      <PrivateRoute exact path='/' component={Dashboard}/>
                      <PrivateRoute exact path='/folder/:folderID' component={Dashboard}/>

                      {/* ProfileRoutes */}
                      <PrivateRoute path='/user' component={Profile}/>
                      <PrivateRoute  path='/updateProfile' component={UpdateProfile}/>
                      {/* AuthRoutes */}
                      <Route path='/signup' component={Signup}/>
                      <Route path='/login' component={Login}/>
                      <Route path='/forgotPass' component={ForgotPassword}/>
                      
                    </Switch>
                </AuthProvider>
              </Router>                
    </div>
    
  );
}

export default App;

