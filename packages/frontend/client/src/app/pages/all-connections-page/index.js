import React, { useState } from 'react';

import Heading from '../../components/heading';
import CreateConnection from '../../components/create-connection';
import { CONNECTIONS } from '../../components/connections';
import SelectConnection from '../../components/select-connection';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { useQuery } from '@apollo/react-hooks';

import './styles.css';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 50
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
}));

const AllConnectionsPage = props => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const {
    loading,
    data: { connections }
  } = useQuery(CONNECTIONS);

  return (
    <div>
      <Heading
        title='Verbindungen'
        subtitle={connections && connections.length}
      />
      {modal && (
        <CreateConnection closeCallback={() => setModal(false)} open={modal} />
      )}
      <Grid className={classes.grid} container spacing={1}>
        {!loading &&
          connections &&
          connections.map((item, index) => (
            <Grid key={index} item>
              <SelectConnection
                key={index}
                start={item.start.name}
                end={item.end.name}
              />
            </Grid>
          ))}
      </Grid>
      <Fab
        className={classes.fab}
        size='large'
        color='secondary'
        aria-label='add'
        onClick={() => setModal(true)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AllConnectionsPage;
