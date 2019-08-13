import React, {useState} from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CONNECTIONS } from '../connections';

import { generateCacheUpdate } from '../../utils/graphql';

import './styles.css';

const baseClassName = 'create-connection';

const CREATE_CONNECTION = gql`
    mutation createConnection($start: String!, $end: String!) {
        createConnection(start: $start, end: $end) {
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

const CreateConnection = () => {
    const [addConnection] = useMutation(
        CREATE_CONNECTION,
        generateCacheUpdate('createConnection', CONNECTIONS, 'connections')
    );

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleInput = stateFunc => e => stateFunc(e.target.value);
    const submitForm = () => {
        addConnection({
            variables: {
                start,
                end,
            }
        }).then(() => {
            setStart('');
            setEnd('');
        })
    }

    return (
        <Card className={`${baseClassName}-card`}>
            <div className={`${baseClassName}-head`}>
                <Typography variant="h5">
                    Create Connection
                </Typography>
            </div>
            <Divider/>
            <div className={`${baseClassName}-body`}>
                <div className={`${baseClassName}-body-inputs`}>
                    <div className={`${baseClassName}-body-inputs-textfield`}>
                        <TextField
                            type='text'
                            variant="outlined"
                            label='Start Station'
                            name='name'
                            value={start}
                            onChange={handleInput(setStart)}
                        />
                    </div>
                    <div className={`${baseClassName}-body-inputs-textfield`}>
                        <TextField
                            type='tel'
                            variant="outlined"
                            label='End Station'
                            name='phone'
                            value={end}
                            onChange={handleInput(setEnd)}
                        />
                    </div>
                </div>
                <div className={`${baseClassName}-body-button`}>
                    <Button onClick={submitForm} variant="contained" color="primary">Create</Button>
                </div>
            </div>
        </Card>
    );
};

export default CreateConnection;