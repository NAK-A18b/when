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
  const { connections } = user.data;
  const classes = useStyles();

  return (
    <div>
      <Heading title='Meine Verbindungen' subtitle={connections.length} />
      <Grid className={classes.grid} container spacing={1}>
        {connections.map((item, index) => (
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
      {connections.length === 0 && (
        <div className={`${baseClassName}-body-wrapper`}>
          <EmptyIllustration />
        </div>
      )}
    </div>
  );
};

export default MyConnectionsPage;
