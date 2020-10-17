import React, { Component } from 'react';
import { TextField, FormControlLabel, Checkbox, IconButton, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  emailList: {
    /*     maxWidth: 500, */
    marginTop: theme.spacing(2),
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
    width: "100%",
  },
  buttonRow: {
    margin: '5vh',
  },
  btn: {
    width: '25%',
    marginTop: 25
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
  emailAdress: '',
  emailAdresses: [],
  emailAdressErrorMessage: ''
}

class CreateEditPollPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleVisibilityChange = e => {
    let value = e.target.name === 'setPublic' ? false : true
    this.setState({ isPrivate: value })
  }

  handleDaysChanged = e => {
    if (e.target.value <= 1000 && e.target.value >= 0) {
      this.setState({ days: e.target.value })
    }
    else if (e.target.value === '') {
      this.setState({ days: '' })
    }
  }

  handleHoursChange = e => {
    if (e.target.value < 24 && e.target.value >= 0) {
      this.setState({ hours: e.target.value })
    }
    else if (e.target.value === '') {
      this.setState({ hours: '' })
    }
  }

  handleMinutesChange = e => {
    if (e.target.value < 60 && e.target.value >= 0) {
      this.setState({ minutes: e.target.value })
    }
    else if (e.target.value === '') {
      this.setState({ hours: '' })
    }
  }

  handleAddEmail = () => {
    let listOfEmails = this.state.emailAdresses

    if (this.validateEmail(this.state.emailAdress)) {
      if (listOfEmails.indexOf(this.state.emailAdress) === -1) {
        listOfEmails.push(this.state.emailAdress)
        this.setState({
          emailAdress: '',
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
    this.setState({
      emailAdress: e.target.value,
      emailAdressErrorMessage: ''
    })
  }

  resetState() {
    this.setState(initialState)
  }

  validateEmail(input) {
    /* return /^[A-ZÆØÅa-zæøå0-9._%+-]+@[A-ZÆØÅa-zæøå0-9.-]+\.[A-ZÆØÅa-zæøå]{2,6}$/.test(input) */
    return true
  }

  deleteEmail(index) {
    let emailAdresses = this.state.emailAdresses
    emailAdresses.splice(index, 1)
    this.setState({ emailAdresses: emailAdresses })
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
          sm={10}
          className={classes.listItem}
          key={index}>
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
        <div className={classes.textInput}>
          <Grid item>
            <TextField className={classes.textInput} id='standard-basic' label='Title'/>
            <Grid item>
              <TextField className={classes.textInput} id='standard-basic' label='Question'/>
            </Grid>
            <FormControlLabel
              control={<Checkbox color='primary' checked={this.state.setDuration} onChange={this.handleChange} name='setDuration' />}
              label='Set duration'
            />
          </Grid>
          <div hidden={!this.state.setDuration}>
            <TextField
              id='days'
              label='DD'
              type='number'
              variant='outlined'
              onChange={this.handleDaysChanged}
              inputProps={{ min: '0', max: '1000', step: '1', value: this.state.days }}
            />
            <TextField
              id='hours'
              label='HH'
              type='number'
              variant='outlined'
              onChange={this.handleHoursChange}
              inputProps={{ min: '0', max: '23', step: '1', value: this.state.hours }}
            />
            <TextField
              id='minutes'
              label='MM'
              type='number'
              variant='outlined'
              onChange={this.handleMinutesChange}
              inputProps={{ min: '0', max: '59', step: '1', value: this.state.minutes }}
            />
          </div>

          <FormControlLabel
            control={<Checkbox color='primary' name='setPublic' checked={!this.state.isPrivate} onChange={this.handleVisibilityChange} />}
            label='Public'
          />

          <FormControlLabel
            control={<Checkbox color='primary' name='setPrivate' checked={this.state.isPrivate} onChange={this.handleVisibilityChange} />}
            label='Private'
          />

          <div hidden={!this.state.isPrivate}>
            <TextField
              id='Email-adress'
              label='Example@email.com'
              type='email'
              variant='outlined'
              onChange={this.handleInputChange}
              value={this.state.emailAdress}
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
          <Button variant="contained" color='primary' className={classes.btn}  >Save</Button>
      </Grid>
    )
  };
}
export default withStyles(styles)(CreateEditPollPage);