import React, {useState} from 'react';

import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';

const baseClassName = 'connections'

const CONNECTIONS = gql`
  query connections {
    connections {
      id
      start {
        name
      }
      end {
        name
      }
    }
  }
`;

const SUBSCRIBERS = gql`
  query subscribers {
    subscribers {
      id
      username
      connections {
        id
      }
    }
  }
`

const SUBSCRIBE_CONNECTION = gql`
  mutation subscribeConnection($subscriber: String!, $connection: String!)  {
    subscribeConnection(subscriber: $subscriber, connection: $connection) {
      id
      username
      connections {
        id
      }
    }
  }
`

const UNSUBSCRIBE_CONNECTION = gql`
  mutation unsubscribeConnection($subscriber: String!, $connection: String!)  {
    unsubscribeConnection(subscriber: $subscriber, connection: $connection) {
      id
      username
      connections {
        id
      }
    }
  }
`

const isSubscribedTo = connection => subscriber => (subscriber.connections.map(conn => conn.id)).includes(connection);

const Connections = () => {
  const connData = useQuery(CONNECTIONS);
  const subData = useQuery(SUBSCRIBERS);
  const [subscribeConnection] = useMutation(SUBSCRIBE_CONNECTION);
  const [unsubscribeConnection] = useMutation(UNSUBSCRIBE_CONNECTION);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubscribe = (subscriber, connection) => () => {
    subscribeConnection({
      variables: {
        subscriber,
        connection
      }
    });
  }

  const unSubscribe = (subscriber, connection) => () => {
    unsubscribeConnection({
      variables: {
        subscriber,
        connection
      }
    });
  }

  return (
    <Card className={`${baseClassName}-card`}>
      <div className={`${baseClassName}-head`}>
        <Typography variant="h5">
          All Connections
        </Typography>
      </div>
      <Divider />
      <div className={`${baseClassName}-body`}>
        { !connData.loading && connData.data.connections.map((connection, index) => {
          const subs = !subData.loading && subData.data.subscribers.filter(isSubscribedTo(connection.id));
          const unsubbed = !subData.loading && subData.data.subscribers.filter((sub) => !subs.includes(sub));
          const hasUnsubbed = unsubbed.length > 0;
          return (
            <div className={`${baseClassName}-connection`} key={index}>
              { connection.start.name } -> { connection.end.name }
              <div className={`${baseClassName}-chip-wrapper`}>
                { !subData.loading && subs.map(sub => (
                  <div key={sub.id}>
                    <Chip
                      className={`${baseClassName}-chip`}
                      label={sub.username}
                      onDelete={unSubscribe(sub.id, connection.id)}
                    />
                  </div>
                ))}
                { unsubbed &&
                  <ClickAwayListener onClickAway={handleClose}>
                    <div>
                      <div className={`${baseClassName}-subscribe-button${!hasUnsubbed ? '--disabled' : ''}`} onClick={hasUnsubbed ? handleClick : null}>
                        <AddIcon/>
                      </div>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                      >
                        { unsubbed.map( (sub) => (
                          <MenuItem key={sub.id} onClick={handleSubscribe(sub.id, connection.id)}>{sub.username}</MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </ClickAwayListener>
                }
                </div>
                <Divider />
              </div>
            )})}
          </div>
        </Card>
    );
}

export default Connections;
