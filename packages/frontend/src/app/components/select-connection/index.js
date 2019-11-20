import React from 'react';
import gql from 'graphql-tag';

import SaveIcon from '../icons/save';
import ConnectionIndicator from '../connection-indicator';
import Label from '../label';

import './styles.css';
import { useMutation } from '@apollo/react-hooks';

const baseClassName = 'selectConnection';

export const SUBSCRIBE_CONNECTION = gql`
  mutation subscribeConnection($connection: String!) {
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
`;

export const UNSUBSCRIBE_CONNECTION = gql`
  mutation unsubscribeConnection($connection: String!) {
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
`;

const SelectConnection = props => {
  const { user, start, end, id, action } = props;
  const [subscribeAction] = useMutation(action);

  const clickAction = () =>
    subscribeAction({
      variables: {
        connection: id
      }
    }).then(user.refetchData);

  return (
    <div className={`${baseClassName}-wrapper`}>
      <div className={`${baseClassName}-body-wrapper`}>
        <div className={`${baseClassName}-station-info-wrapper`}>
          <ConnectionIndicator color='#3F51B5' />
          <div className={`${baseClassName}-station-info`}>
            <Label primary>{start}</Label>
            <Label primary>{end}</Label>
          </div>
        </div>
        <div className={`${baseClassName}-save-icon`} onClick={clickAction}>
          <props.icon />
        </div>
      </div>
    </div>
  );
};

export default SelectConnection;
