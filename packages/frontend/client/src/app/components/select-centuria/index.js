import React from 'react';

import Card from '@material-ui/core/Card';

import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';

import {Button, CardContent} from '@material-ui/core';
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";

const baseClassName = 'centuria';

export const CENTURIAS = gql`
    query centuria {
        centurias {
            name
        }
    }
`;

const SUBSCRIBE_CENTURIA = gql`
    mutation subscribeCenturia($centuria: String!)  {
        subscribeCenturia(centuria: $centuria) {
            id
        }
    }
`


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  }
}));

const SelectCenturia = (props) => {
  const {user} = props;

  const classes = useStyles();
  const {loading, data: {centurias}} = useQuery(CENTURIAS);
  const [subscribeCenturia] = useMutation(SUBSCRIBE_CENTURIA);
  let buttons = [];
  if (centurias) {
    centurias.forEach(item => (
      buttons.push(
        <Button key={item.name} variant="contained" color="secondary" onClick={() => {
          subscribeCenturia({
            variables: {
              centuria: item.name
            }
          }).then(user.refetchData);
        }} className={`centuria-buttons ` + classes.button}>
          {item.name}
        </Button>)
    ));
  }

  return (
    <Card className={`${baseClassName}-card`}>
      <div className="select-centuria">
        <CardHeader title="Select your centuria">
        </CardHeader>
        <CardContent>
          {buttons}
        </CardContent>
      </div>
    </Card>
  );
}

export default SelectCenturia;
