import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core/';
import { getDaysHoursMinFromMin } from '../utils/calculateTime'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    margin: theme.spacing(3),
    paddingTop: theme.spacing(2)
  },
  pollInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3)
  },
  title: {
    marginTop: theme.spacing(5),
  },
  btnContainer: {
    marginTop: theme.spacing(5)
  },
  btn: {
    width: '15%',
    margin: theme.spacing(2)
  }
}));

function getData(props) {
  return { pollOwner: 'Hans', duration: getDaysHoursMinFromMin(127325), question: 'Pinaple on pizza?' } //SWAP WITH this.props.location.state

}

export const VotePage = (props) => {
  const classes = useStyles();
  const data = getData(props)

  function sendVote(vote) {
    let job = {
      pollId: props.match.params.pollId,
      vote: vote
    }
  }

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        elevation={3}>
        <div className={classes.pollInfo}>
          <Typography>{data.pollOwner + '\'s poll'}</Typography>
          <Typography>{'Time remaining: ' + data.duration}</Typography>
        </div>
        <Typography variant='h4' className={classes.title}>{data.question}</Typography>

        <div className={classes.btnContainer}>
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={(() => sendVote('YES'))}>
            Yes
              </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={(() => sendVote('NO'))}>
            no
            </Button>
        </div>
      </Paper>
    </div>
  )
}