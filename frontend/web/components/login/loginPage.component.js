import React from 'react';
import { connect } from 'react-redux';
import { sessionLogin } from '../../selectors/auth.selector';
import {
  Button,
  Container,
  Form,
  Grid,
  Redirect,
  Segment
} from 'semantic-ui-react';

export class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleEmailChange = e => {
    const email = e.target.value;

    this.setState(prevState => Object.assign(prevState, {
      email
    }));
  };

  handlePasswordChange = e => {
    const password = e.target.value;

    this.setState(prevState => Object.assign(prevState, {
      password
    }));
  };

  handleLoginButtonClick = () => {
    this.props.onLogin({
      email: this.state.email,
      password: this.state.password
    }).then(() => {
      localStorage.setItem('SESSION_USER_EMAIL', this.props.session.user.email);
      localStorage.setItem('SESSION_IAT', this.props.session.iat);
      localStorage.setItem('SESSION_TOKEN', this.props.session.token);
      this.props.history.push("/users/");
    }).catch(error => {
      // TODO - Show appropriate error messages
      console.log('ERROR:', error);
    });
  };

  render() {
    return (
      <div id='a12345' className='login-page'>
        <Container>
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size='large'>
                <Segment stacked>
                  <h3>Log-in to your account</h3>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <Button
                    fluid
                    size='large'
                    color='black'
                    onClick={this.handleLoginButtonClick}>
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    session: state.session,
  }
};

const mapDispatchToProps = dispatch => ({
  onLogin: params => dispatch(sessionLogin(params))
});

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default connectedComponent;