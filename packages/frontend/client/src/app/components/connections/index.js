import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

const baseClassName = 'connections'

export const CONNECTIONS = gql`
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

const SUBSCRIBE_CONNECTION = gql`
  mutation subscribeConnection($connection: String!)  {
    subscribeConnection(connection: $connection) {
      id
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
  }
`

const UNSUBSCRIBE_CONNECTION = gql`
  mutation unsubscribeConnection($connection: String!)  {
    unsubscribeConnection(connection: $connection) {
      id
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
  }
`

const isSubscribedTo = (user, connection) => 
  !!(user.connections && !!user.connections.find(conn => conn.id === connection.id));

const Connections = (props) => {
  const { currentUser } = props
  const { loading, data: { connections } } = useQuery(CONNECTIONS);

  const [subscribeConnection] = useMutation(SUBSCRIBE_CONNECTION);
  const [unsubscribeConnection] = useMutation(UNSUBSCRIBE_CONNECTION);

  const subscribe = (connection) => () =>
    subscribeConnection({
      variables: {
        connection
      }
    }).then(currentUser.refetchData);

  const unSubscribe = (connection) => () =>
    unsubscribeConnection({
      variables: {
        connection
      }
    }).then(currentUser.refetchData);

  const unsubbedConnections = [], subbedConnections = [];
  if (!loading && connections) {
    connections.forEach(connection =>
      (isSubscribedTo(currentUser.data, connection) ? subbedConnections : unsubbedConnections).push(connection));
  }

  return (
    <div className={`${baseClassName}-wrapper`}>
      <Card className={`${baseClassName}-card`}>
        <div className={`${baseClassName}-head`}>
          <Typography variant="h5">
            { 'Other Connections' }
          </Typography>
        </div>
        <div className={`${baseClassName}-body`}>
          <List dense component="div" role="list">
            {unsubbedConnections.map(({ id, start, end}) => (
              <div key={id} className={`${baseClassName}-connection-item`}>
                <ListItem role="listitem">
                  <ListItemText primary={`${ start.name } → ${ end.name }`} />
                  <Button color="primary" onClick={subscribe(id)}>{ 'subscribe' }</Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
        <div className={`${baseClassName}-head`}>
          <Typography variant="h5">
            { 'Your Connections' }
          </Typography>
        </div>
        <div className={`${baseClassName}-body`}>
          <List dense component="div" role="list">
          {subbedConnections.map(({ id, start, end}) => (
            <div key={id} className={`${baseClassName}-connection-item`}>
              <ListItem role="listitem">
                <ListItemText primary={`${ start.name } → ${ end.name }`} />
                <Button color="primary" onClick={unSubscribe(id)}>{ 'unsubscribe' }</Button>
              </ListItem>
              <Divider /> 
            </div>
          ))}
        </List>
        </div>
      </Card>
    </div>
    );
}

export default Connections;
