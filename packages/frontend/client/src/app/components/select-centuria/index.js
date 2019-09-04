import React from 'react';

import Card from '@material-ui/core/Card';

import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';

import { Button, CardContent } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { generateObjectCacheUpdate } from '../../utils/graphql';
import { CURRENT_USER_QUERY } from '../../context/user/resolvers';

const baseClassName = 'centuria';

export const CENTURIAS = gql`
  query centuria {
    centurias {
      name
      semester
    }
  }
`;

const SUBSCRIBE_CENTURIA = gql`
  mutation subscribeCenturia($centuria: String!) {
    subscribeCenturia(centuria: $centuria) {
      id
      centuria {
        name
        semester
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const SelectCenturia = props => {
  const { user } = props;
  const classes = useStyles();

  const {
    data: { centurias }
  } = useQuery(CENTURIAS);
  const [subscribeCenturia] = useMutation(
    SUBSCRIBE_CENTURIA,
    generateObjectCacheUpdate(
      'subscribeCenturia',
      CURRENT_USER_QUERY,
      'currentUser'
    )
  );

  const subscribe = centuria => () => {
    subscribeCenturia({
      variables: {
        centuria: centuria.name
      }
    }).then(user.refetchData);
  };

  return (
    <Card className={`${baseClassName}-card`}>
      <div className='select-centuria'>
        <CardHeader title='Select your centuria'></CardHeader>
        <CardContent>
          {centurias &&
            centurias.map(item => {
              const isSelected =
                !user.loading && user.data.centuria.name === item.name;
              return (
                <Button
                  key={item.name}
                  variant='contained'
                  color={isSelected ? 'primary' : 'default'}
                  onClick={!isSelected ? subscribe(item) : null}
                  className={`centuria-buttons ` + classes.button}
                >
                  {item.name}
                </Button>
              );
            })}
        </CardContent>
      </div>
    </Card>
  );
};

export default SelectCenturia;
