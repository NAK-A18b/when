import React from 'react';

import Card from '@material-ui/core/Card';

import './styles.css';

import {Button, CardContent} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles({
  card: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SelectConnection = (props) => {
  const classes = useStyles();
  const {user} = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.start}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.end}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Subscribe</Button>
      </CardActions>
    </Card>
  );
}

export default SelectConnection;
