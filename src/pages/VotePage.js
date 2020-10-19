import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core/';

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
  },
  title: {
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
  return { pollOwner: 'Hans', duration: calculateTime(127325), question: 'Pinaple on pizza?' } //SWAP WITH this.props.location.state

}

function calculateTime(time) {
  let days = Math.floor(time / 24 / 60)
  time = time - (days * 60 * 24)
  let hours = Math.floor(time / 60) % 60
  let minutes = time - (hours * 60)
  return days + " days " + hours + ' hours ' + minutes + " min";
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
          <Typography>{data.pollOwner + '\'s'}</Typography>
          <Typography>{'Time remaining: ' + data.duration}</Typography>
        </div>

        <Typography variant='h4'>{data.question}</Typography>

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