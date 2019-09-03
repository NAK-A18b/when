import React from 'react';

import Heading from "../../components/heading";
import CreateConnection from '../../components/create-connection';
import Connections, {CONNECTIONS} from "../../components/connections";
import SelectConnection from "../../components/select-connection";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AllConnectionsPage = props => {
  const {loading, data: {connections}} = useQuery(CONNECTIONS);
  const cons = [];
  if(connections) {
    connections.forEach((item, index) => {
      cons.push(<Grid item><SelectConnection key={index} start={item.start.name} end={item.end.name}/></Grid>
      )
    });
  }
  const classes = useStyles();

  return (
    <div>
      <Heading title="Connections" subtitle="0"/>
      <br/>
      <CreateConnection/>
      <br/>
      <Grid container spacing={1}>
        {cons}
      </Grid>
    </div>
  );
}

export default AllConnectionsPage;