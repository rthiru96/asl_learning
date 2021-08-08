import React from "react";
import {
  Grid,
  Button,
  InputAdornment,
  FormControl,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { Person, Lock } from "@material-ui/icons";
import { LoginStyle } from "./style";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as loginActions from "../../redux/actions/loginActions";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loader: false,
    };
    this._isMounted = false;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signUp = () => {
    this.props.history.push("/sign-up");
  };

  login = async () => {
    try {
      this._isMounted = true;
      this.setState({ loader: true });
      let data = {
        username: this.state.username,
        password: this.state.password,
      };
      await this.props.loginActions.studentLogin(data);
      this.props.history.push("/student");
    } catch (ex) {
      console.error(ex);
    } finally {
      this._isMounted = false;
      if (this._isMounted) {
        this.setState({ loader: false });
      }
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <Grid className={classes.gridHeader}>
            <Grid item xs={12}>
              <FormControl>
                <TextValidator
                  name="username"
                  placeholder="Username/Email"
                  onChange={this.handleChange}
                  value={this.state.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  validators={["required"]}
                  errorMessages={["Username is required"]}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextValidator
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={["Password is required"]}
                  value={this.state.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.buttonGrid}>
              {this.state.loader && (
                <div className={classes.loginButtonProgressWrapper}>
                  <CircularProgress
                    className={classes.loginButtonProgress}
                    size={32}
                  />
                </div>
              )}
              <Button className={classes.loginButton} onClick={this.login}>
                Login
              </Button>
              <Button className={classes.signUpButton} onClick={this.signUp}>
                SignUp
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
  };
}

export default compose(
  withStyles(LoginStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
