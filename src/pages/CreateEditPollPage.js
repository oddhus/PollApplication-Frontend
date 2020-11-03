import React, { Component } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { DurationPicker } from "../components/DurationPicker";
import { withRouter } from "react-router-dom";
import {
  getDaysFromSeconds,
  getHoursFromSeconds,
  getMinFromSeconds,
} from "../utils/calculateTime";
import axios from "axios";
import { StatusBar } from "../components/StatusBar";
import { ThemeCircularProgress } from "../components/ThemeCircularProgress";

const styles = (theme) => ({
  emailList: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: "5vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginLeft: "15%",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  listItem: {
    background: "#D3D3D3",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #bababa",
  },
  listItemDelete: {
    display: "inline-block",
    float: "rigth",
  },
  textInput: {
    width: "70%",
  },
  btn: {
    width: "25%",
    marginTop: 25,
    marginLeft: theme.spacing(-20),
  },
});

const initialState = {
  pollName: "",
  question: "",
  setDuration: false,
  visibilityType: "PUBLIC",
  days: "",
  hours: "",
  minutes: "",
  email: "",
  emailAdresses: [],
  emailAdressErrorMessage: "",
  statusMessage: "",
  openStatusMessage: false,
  isLoading: false,
};

class CreateEditPollPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleCheckboxChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleVisibilityChange = (e) => {
    this.setState({ visibilityType: e.target.name });
  };

  handleAddEmail = () => {
    let listOfEmails = this.state.emailAdresses;
    if (this.validateEmail(this.state.email)) {
      if (listOfEmails.indexOf(this.state.email) === -1) {
        listOfEmails.push(this.state.email);
        this.setState({
          email: "",
          emailAdresses: listOfEmails,
        });
      } else {
        this.setState({
          emailAdressErrorMessage: " You have already added this email!",
        });
      }
    } else {
      this.setState({ emailAdressErrorMessage: "Email-adress not valid" });
    }
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === "email") {
      this.setState({ emailAdressErrorMessage: "" });
    }
  };

  handleDurationChanged = (e) => {
    this.setState({ [e.attr]: e.value });
  };

  handleSaveClicked = async () => {
    this.setState({ isLoading: true });
    const job = {
      poll: {
        name: this.state.pollName,
        question: this.state.question,
        pollDuration: this.calculateDuration(),
        visibilityType: this.state.visibilityType,
      },
      emails: this.state.emailAdresses,
    };
    const location = this.props.match.params.pollId
      ? `/polls/${this.props.match.params.pollId}`
      : "/polls";
    try {
      let response;
      if (location === "/polls") {
        response = await axios.post(location, job);
      } else {
        response = await axios.put(location, job);
      }
      if (response.status === 200) {
        this.setState({ isLoading: false });
        this.props.history.push({
          pathname: "/polls",
          state: {
            addedPoll: location === "/polls" ? response.data : undefined,
            updatedPoll: location === "/polls" ? undefined : response.data,
          },
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      this.setState({
        openStatusMessage: true,
        statusMessage: "Could not create poll",
      });
      this.setState({ isLoading: false });
    }
  };

  setOpenStatusMessage(status) {
    if (this) {
      this.setState({ openStatusMessage: status });
    }
  }

  /**
   * Returns the total amount of minutes from the 'DD,HH,MM' inputs
   */
  calculateDuration() {
    let daysInMin = this.state.days * 24 * 60 * 60;
    let hoursInMin = this.state.hours * 60 * 60;
    return daysInMin + hoursInMin + this.state.minutes;
  }

  resetState() {
    this.setState(initialState);
  }

  validateEmail(input) {
    return /^[A-ZÆØÅa-zæøå0-9._%+-]+@[A-ZÆØÅa-zæøå0-9.-]+\.[A-ZÆØÅa-zæøå]{2,6}$/.test(
      input
    );
  }

  deleteEmail(index) {
    let emailAdresses = this.state.emailAdresses;
    emailAdresses.splice(index, 1);
    this.setState({ emailAdresses: emailAdresses });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.pathname.includes("/polls") &&
      window.location.pathname === "/create"
    ) {
      this.resetState();
    }
  }

  componentDidMount() {
    // Seutp the correct state corresponding to if an existing poll should be edited or if a new one should be created.
    if (this.props.location.state === undefined) {
      this.resetState();
    } else {
      let state = this.props.location.state;
      if (state) {
        let duration = this.props.location.state.pollDuration;
        state.days = getDaysFromSeconds(duration);
        duration = duration - state.days * 60 * 60 * 24;
        state.hours = getHoursFromSeconds(duration);
        duration = duration - state.hours * 60 * 60;
        state.minutes = getMinFromSeconds(duration);
        state.setDuration = true;
      }
      if (state && state.allowedVoters) {
        state.emailAdresses = state.allowedVoters;
      }
      this.setState(state);
    }
  }

  render() {
    const { classes } = this.props;

    const emailList = this.state.emailAdresses.map((emailAdress, index) => (
      <Grid
        container
        className={classes.emailList}
        direction="row"
        key={"grid" + index}
      >
        <Grid item xs={8} sm={9} className={classes.listItem} key={index}>
          {emailAdress}
        </Grid>

        <Grid item>
          <IconButton
            className={classes.listItemDelete}
            key={"delete" + index}
            aria-label="delete"
            color="primary"
            onClick={() => this.deleteEmail(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    ));

    return (
      <React.Fragment>
        <StatusBar
          open={this.state.openStatusMessage}
          setOpen={this.setOpenStatusMessage}
          severity={"error"}
        >
          Could not create poll!
        </StatusBar>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.formContainer}
          direction="column"
        >
          <div className={classes.container}>
            <Grid item>
              <TextField
                className={classes.textInput}
                id="pollName"
                label="Title"
                onChange={this.handleInputChange}
                inputProps={{ value: this.state.pollName }}
              />
              <Grid item>
                <TextField
                  className={classes.textInput}
                  id="question"
                  label="Question"
                  onChange={this.handleInputChange}
                  inputProps={{ value: this.state.question }}
                />
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={this.state.setDuration}
                    onChange={this.handleCheckboxChange}
                    name="setDuration"
                  />
                }
                label="Set duration"
              />
            </Grid>

            <div hidden={!this.state.setDuration}>
              <DurationPicker
                days={this.state.days}
                hours={this.state.hours}
                minutes={this.state.minutes}
                onDaysChanged={this.handleDurationChanged}
                onHoursChanged={this.handleDurationChanged}
                onMinutesChanged={this.handleDurationChanged}
              />
            </div>
            <div className={classes.visibilityContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="PUBLIC"
                    checked={this.state.visibilityType === "PUBLIC"}
                    onChange={this.handleVisibilityChange}
                  />
                }
                label="Public"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="PRIVATE"
                    checked={this.state.visibilityType === "PRIVATE"}
                    onChange={this.handleVisibilityChange}
                  />
                }
                label="Private"
              />
            </div>

            <div hidden={this.state.visibilityType === "PUBLIC"}>
              <TextField
                id="email"
                label="Example@email.com"
                type="email"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.email}
                error={this.state.emailAdressErrorMessage !== ""}
                helperText={this.state.emailAdressErrorMessage}
              />
              <IconButton
                aria-label="add"
                color="primary"
                onClick={this.handleAddEmail}
              >
                <AddIcon />
              </IconButton>

              <div>{emailList}</div>
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={this.handleSaveClicked}
          >
            {this.state.isLoading ? <ThemeCircularProgress /> : "Save"}
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(CreateEditPollPage));
