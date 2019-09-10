import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Grid, makeStyles } from '@material-ui/core';

import Heading from '../../components/heading';
import EmptyIllustration from '../../components/illustrations/empty';
import SelectConnection, {
  UNSUBSCRIBE_CONNECTION
} from '../../components/select-connection';
import { CONNECTIONS } from '../../components/connections';
import TrashIcon from '../../components/icons/trash';

import { isSubscribedTo } from '../../utils/connections';

import './styles.css';

const baseClassName = 'connectionsPage';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 50
  }
}));

const MyConnectionsPage = props => {
  const { user } = props;
  const classes = useStyles();
  const {
    loading,
    data: { connections }
  } = useQuery(CONNECTIONS);

  const filteredConnections =
    connections &&
    connections.filter(connection => isSubscribedTo(user.data, connection));

  return (
    <div>
      <Heading
        title='Meine Verbindungen'
        subtitle={!loading && filteredConnections.length}
      />
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
                action={UNSUBSCRIBE_CONNECTION}
                icon={TrashIcon}
              />
            </Grid>
          ))}
      </Grid>
      {filteredConnections && filteredConnections.length === 0 && (
        <div className={`${baseClassName}-body-wrapper`}>
          <EmptyIllustration />
        </div>
      )}
    </div>
  );
};

export default MyConnectionsPage;
