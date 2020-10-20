import React, { Component } from 'react';
import { TextField, FormControlLabel, Checkbox, IconButton, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'
import { DurationPicker } from '../components/DurationPicker';
import { getDaysFromMinutes, getHoursFromMinutes } from '../utils/calculateTime'

const styles = theme => ({
  emailList: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: '5vh',
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    marginLeft: '15%',
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    }
  },
  listItem: {
    background: '#D3D3D3',
    padding: 10,
    borderRadius: 8,
    border: '1px solid #bababa'
  },
  listItemDelete: {
    display: 'inline-block',
    float: 'rigth'
  },
  textInput: {
    width: "70%",
  },
  btn: {
    width: '25%',
    marginTop: 25,
    marginLeft: theme.spacing(-20)
  }
});

const initialState = {
  title: '',
  question: '',
  setDuration: false,
  isPrivate: false,
  days: '',
  hours: '',
  minutes: '',
  email: '',
  emailAdresses: [],
  emailAdressErrorMessage: ''
}

class CreateEditPollPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  handleCheckboxChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleVisibilityChange = e => {
    let value = e.target.name === 'setPublic' ? false : true
    this.setState({ isPrivate: value })
  }

  handleAddEmail = () => {
    let listOfEmails = this.state.emailAdresses
    if (this.validateEmail(this.state.email)) {
      if (listOfEmails.indexOf(this.state.email) === -1) {
        listOfEmails.push(this.state.email)
        this.setState({
          email: '',
          emailAdresses: listOfEmails
        })
      } else {
        this.setState({ emailAdressErrorMessage: ' You have already added this email!' })
      }
    } else {
      this.setState({ emailAdressErrorMessage: 'Email-adress not valid' })
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === 'email') {
      this.setState({ emailAdressErrorMessage: '' })
    }
  }

  handleDurationChanged = e => {
    this.setState({ [e.attr]: e.value })
  }


  handleSaveClicked = () => {
    let job = {
      title: this.state.title,
      question: this.state.question,
      pollDuration: this.calculateDuration(),
      visibilityType: this.state.isPrivate === true ? 'PRIVATE' : 'PUBLIC',
      emailAdresses: this.state.emailAdresses
    }
    //let location = this.props.match.params.pollId !== ? 'polls/edit/this.props.match.params.pollId' : 'polls'
  }

  /**
   * Returns the total amount of minutes from the 'DD,HH,MM' inputs
   */
  calculateDuration() {
    let daysInMin = this.state.days * 24 * 60
    let hoursInMin = this.state.hours * 60
    return daysInMin + hoursInMin + this.state.minutes
  }

  resetState() {
    this.setState(initialState)
  }

  validateEmail(input) {
    return /^[A-ZÆØÅa-zæøå0-9._%+-]+@[A-ZÆØÅa-zæøå0-9.-]+\.[A-ZÆØÅa-zæøå]{2,6}$/.test(input)
  }

  deleteEmail(index) {
    let emailAdresses = this.state.emailAdresses
    emailAdresses.splice(index, 1)
    this.setState({ emailAdresses: emailAdresses })
  }

  componentDidMount() {
    // Seutp the correct state corresponding to if an existing poll should be edited or if a new one should be created.
    if (this.props.location.state === undefined) {
      this.resetState()
    } else {
      let state = this.props.location.state
      if (this.props.location.state !== undefined) {
        let duration = this.props.location.state.duration
        state.days = getDaysFromMinutes(duration)
        duration = duration - (state.days * 60 * 24)
        state.hours = getHoursFromMinutes(duration)
        state.minutes = duration - (state.hours * 60)
        state.setDuration = true
      }
      this.setState(state)
    }
  }

  render() {
    const { classes } = this.props

    const emailList = this.state.emailAdresses.map((emailAdress, index) =>
      <Grid
        container
        className={classes.emailList}
        direction='row'
        key={'grid' + index}
      >
        <Grid item
          xs={8}
          sm={9}
          className={classes.listItem}
          key={index}
        >
          {emailAdress}
        </Grid>

        <Grid item>
          <IconButton
            className={classes.listItemDelete}
            key={'delete' + index}
            aria-label='delete'
            color='primary'
            onClick={() => this.deleteEmail(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    );

    return (
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
              id='title'
              label='Title'
              onChange={this.handleInputChange}
              inputProps={{ value: this.state.title }}
            />
            <Grid item>
              <TextField
                className={classes.textInput}
                id='question'
                label='Question'
                onChange={this.handleInputChange}
                inputProps={{ value: this.state.question }}
              />
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.setDuration}
                  onChange={this.handleCheckboxChange}
                  name='setDuration'
                />
              }
              label='Set duration'
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
              control={<Checkbox
                color='primary'
                name='setPublic'
                checked={!this.state.isPrivate}
                onChange={this.handleVisibilityChange}
              />
              }
              label='Public'
            />
            <FormControlLabel
              control={<Checkbox
                color='primary'
                name='setPrivate'
                checked={this.state.isPrivate}
                onChange={this.handleVisibilityChange}
              />
              }
              label='Private'
            />
          </div>

          <div hidden={!this.state.isPrivate}>
            <TextField
              id='email'
              label='Example@email.com'
              type='email'
              variant='outlined'
              onChange={this.handleInputChange}
              value={this.state.email}
              error={this.state.emailAdressErrorMessage !== ''}
              helperText={this.state.emailAdressErrorMessage}
            />
            <IconButton
              aria-label='add'
              color='primary'
              onClick={this.handleAddEmail}
            >
              <AddIcon />
            </IconButton>

            <div>
              {emailList}
            </div>
          </div>
        </div>

        <Button
          variant="contained"
          color='primary'
          className={classes.btn}
          onClick={this.handleSaveClicked}>
          Save
          </Button>
      </Grid>
    )
  };
}

export default withStyles(styles)(CreateEditPollPage);