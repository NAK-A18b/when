import React from 'react';

import './styles.css';

const baseClassName = 'heading';

const Heading = (props) => {
    return (
        <div className="heading">
            <span className="heading-subtitle">{props.subtitle}</span>
            <span className="heading-title">{props.title}</span>
        </div>
    );
};

export default Heading;
