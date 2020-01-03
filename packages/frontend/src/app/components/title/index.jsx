import React from 'react';

const Styles = {
  fontSize: '70px',
  color: '#707070',
  fontWeight: '200',
  display: 'inline'
}

const Title = (props) => {
  const { children } = props;

  return (
    <h1 style={ Styles }>
      { children }
    </h1>
  )
}

export default Title;