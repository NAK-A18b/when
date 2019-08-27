import React from 'react';

import './styles.css';
import Title from '../title';
import Label from '../label';

const Heading = (props) => {
    return (
        <div className={ 'heading-wrapper' }>
            <Title>{ props.title }</Title>
            <Label className={ 'heading-subtitle' }>{ props.subtitle }</Label>
        </div>
    );
};

export default Heading;
