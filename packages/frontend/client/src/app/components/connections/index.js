import React, {useState} from 'react';

import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import {useQuery} from '@apollo/react-hooks';
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

const isSubscribedTo = connection => subscriber => (subscriber.connections.map(conn => conn.id)).includes(connection);

const Connections = () => {
    const connData = useQuery(CONNECTIONS);
    const subData = useQuery(SUBSCRIBERS);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Card className={`${baseClassName}-card`}>
            <div className={`${baseClassName}-head`}>
                <Typography variant="h5">
                    All Connections
                </Typography>
            </div>
            <Divider/>
            <div className={`${baseClassName}-body`}>
                {!connData.loading && connData.data.connections.map((connection, index) => {
                    const subs = !subData.loading && subData.data.subscribers.filter(isSubscribedTo(connection.id));
                    return (
                        <div className={`${baseClassName}-connection`} key={index}>
                            {connection.start} -> {connection.end}
                            <div className={`${baseClassName}-chip-wrapper`}>
                                {!subData.loading && subs.map(sub => (
                                    <div key={sub.id}>
                                        <Chip
                                            label={sub.username}
                                            onDelete={() => console.log('delete')}
                                        />
                                    </div>
                                ))}
                                <ClickAwayListener onClickAway={handleClose}>
                                    <div>
                                        <div className={`${baseClassName}-subscribe-button`} onClick={handleClick}>
                                            <AddIcon/>
                                        </div>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                </ClickAwayListener>
                            </div>
                            <Divider/>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

export default Connections;
