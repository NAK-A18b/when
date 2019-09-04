import React, { useState } from 'react';

import { isSubscribedTo } from '../../utils/connections';

import Heading from '../../components/heading';
import CreateConnection from '../../components/create-connection';
import { CONNECTIONS } from '../../components/connections';
import SelectConnection, {
  SUBSCRIBE_CONNECTION
} from '../../components/select-connection';

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
    transition: 'all 0.2s ease',
    position: 'absolute',
    right: 20,
    bottom: 20,
    transform: 'scale(1)'
  },
  hiddenFab: {
    transition: 'all 0.2s ease',
    position: 'absolute',
    right: 20,
    bottom: 20,
    transform: 'scale(0)',
    visibility: 'hidden'
  }
}));

const AllConnectionsPage = props => {
  const { user } = props;
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const {
    loading,
    data: { connections }
  } = useQuery(CONNECTIONS);

  const filteredConnections =
    connections &&
    connections.filter(connection => !isSubscribedTo(user.data, connection));

  return (
    <div>
      <Heading
        title='Verbindungen'
        subtitle={filteredConnections && filteredConnections.length}
      />
      {modal && (
        <CreateConnection closeCallback={() => setModal(false)} open={modal} />
      )}
      <Grid className={classes.grid} container spacing={1}>
        {!loading &&
          filteredConnections &&
          filteredConnections.map((item, index) => (
            <Grid key={index} item>
              <SelectConnection
                user={user}
                id={item.id}
                start={item.start.name}
                end={item.end.name}
                action={SUBSCRIBE_CONNECTION}
              />
            </Grid>
          ))}
      </Grid>
      <Fab
        className={props.mounted ? classes.fab : classes.hiddenFab}
        size='large'
        color='primary'
        aria-label='add'
        onClick={() => setModal(true)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AllConnectionsPage;
