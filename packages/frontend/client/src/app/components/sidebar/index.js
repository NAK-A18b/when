import React, { useRef, useEffect } from 'react';

import ClockIcon from '../icons/clock';
import TrainIcon from '../icons/train';
import AvatarIcon from '../icons/avatar';
import SliderIcon from '../icons/slider';

import './styles.css';
import { Button } from '@material-ui/core';

const baseClassName = 'sidebar';

const PADDING_OFFSET = 10;

const Sidebar = props => {
  const { pages, pageIndex, navigationCallback } = props;
  const indicator = useRef(null);
  const currentItem = useRef(null);

  useEffect(() => {
    if (indicator.current) {
      indicator.current.style.top = `${currentItem.current.offsetTop +
        PADDING_OFFSET}px`;
    }
  });

  return (
    <div className={`${baseClassName}-wrapper`}>
      <div>
        {pages.map((item, index) => {
          const isCurrent = index === pageIndex;
          return (
            <div
              ref={isCurrent ? currentItem : null}
              key={index}
              className={`${baseClassName}-item${isCurrent ? '--active' : ''}`}
            >
              <div onClick={() => navigationCallback(index)}>
                <item.icon />
              </div>
            </div>
          );
        })}
      </div>
      <Button onClick={props.user.logout}>logout</Button>
      <div ref={indicator} className={`${baseClassName}-indicator`}></div>
    </div>
  );
};

export default Sidebar;
