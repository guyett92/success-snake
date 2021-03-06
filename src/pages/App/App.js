import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import UserPage from '../UserPage/UserPage';
import GoalsPage from '../GoalsPage/GoalsPage';
import AddGoalPage from '../AddGoalPage/AddGoalPage';
import ViewGoalsPage from '../ViewGoalsPage/ViewGoalsPage';
import userService from '../../utils/userService';
import { getQOD } from '../../utils/quote';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      title: "Scsr.ly",
      openSidebar: false,
      userGoals: []
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleSidebarOpen = () => {
    this.setState({ openSidebar: true });
  };

  handleSidebarClose = () => {
    this.setState({ openSidebar: false });
  };

  handleUpdateGoals = (userGoals) => {
    this.setState({ userGoals });
  }

  handleUpdateUser = (user) => {
    this.setState({user})
  }

  async componentDidMount() {
    const quote = await getQOD('inspire');
    this.setState({
      quote: quote.contents.quotes[0].quote,
      quoteAuth: quote.contents.quotes[0].author,
    });
    this.setState({user: userService.getUser()});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path ='/' render={() => 
              <HomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
                title={this.state.title}
                quote={this.state.quote}
                quoteAuth={this.state.quoteAuth}
                open={this.state.openSidebar}
                onOpen={this.handleSidebarOpen}
                onClose={this.handleSidebarClose}
              />
            }/>
            <Route exact path='/signup' render={ (props) =>
              userService.getUser() ?
                <Redirect to='/' />
              :
                <SignupPage
                  {...props}
                  history={props.history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                  title={this.state.title}
                  quote={this.state.quote}
                  quoteAuth={this.state.quoteAuth}
                  user={this.state.user}
                  open={this.state.openSidebar}
                  handleLogout={this.handleLogout}
                  onOpen={this.handleSidebarOpen}
                  onClose={this.handleSidebarClose}
                />
            }/>
            <Route exact path='/login' render={ (props) => 
              userService.getUser() ?
                <Redirect to='/' />
              :
                <LoginPage
                  {...props}
                  history={props.history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                  title={this.state.title}
                  quote={this.state.quote}
                  quoteAuth={this.state.quoteAuth}
                  user={this.state.user}
                  open={this.state.openSidebar}
                  handleLogout={this.handleLogout}
                  onOpen={this.handleSidebarOpen}
                  onClose={this.handleSidebarClose}
                />
            }/>
            <Route exact path='/user' render={ (props) =>
              userService.getUser() ?
                <UserPage
                  history={props.history}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  title={this.state.title}
                  quote={this.state.quote}
                  quoteAuth={this.state.quoteAuth}
                  open={this.state.openSidebar}
                  onOpen={this.handleSidebarOpen}
                  onClose={this.handleSidebarClose}
                  handleUpdateUser={this.handleUpdateUser}
                />
                :
                <Redirect to='/login' />
            }/>
            <Route exact path='/goals' render={ (props) =>
              <GoalsPage
                history={props.history}
                user={this.state.user}
                handleLogout={this.handleLogout}
                title={this.state.title}
                quote={this.state.quote}
                quoteAuth={this.state.quoteAuth}
                open={this.state.openSidebar}
                onOpen={this.handleSidebarOpen}
                onClose={this.handleSidebarClose}
                handleUpdateGoals={this.handleUpdateGoals}
                userGoals={this.state.userGoals}
              />
            }/>
            <Route exact path='/addgoal' render={ (props) =>
              userService.getUser() ?
                <AddGoalPage
                  history={props.history}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  title={this.state.title}
                  quote={this.state.quote}
                  quoteAuth={this.state.quoteAuth}
                  open={this.state.openSidebar}
                  onOpen={this.handleSidebarOpen}
                  onClose={this.handleSidebarClose}
                />
              :
                <Redirect to='/login' />
            }/>
            <Route exact path='/viewgoals' render={ (props) =>
              <ViewGoalsPage 
                history={props.history}
                user={this.state.user}
                handleLogout={this.handleLogout}
                title={this.state.title}
                quote={this.state.quote}
                quoteAuth={this.state.quoteAuth}
                open={this.state.openSidebar}
                onOpen={this.handleSidebarOpen}
                onClose={this.handleSidebarClose}
              />
            }/>
          </Switch>
      </ThemeProvider>
    );
  }
}

