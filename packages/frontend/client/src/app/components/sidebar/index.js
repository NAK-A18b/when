import React, { useRef, useEffect } from 'react';

import ClockIcon from '../icons/clock';
import TrainIcon from '../icons/train';
import AvatarIcon from '../icons/avatar';
import SliderIcon from '../icons/slider';

import './styles.css';

const baseClassName = 'sidebar';

const PageItems = [ 
  { icon: ClockIcon},
  { icon: TrainIcon},
  { icon: AvatarIcon},
  { icon: SliderIcon},
];

const Sidebar = (props) => {
  const indicator = useRef(null);
  const currentItem = useRef(null);

  const { pageIndex } = props;
  
  useEffect(
    () => {
      if (indicator.current) {
        indicator.current.style.top = `${currentItem.current.offsetTop + 20}px`;
      }
    },
  );
  

  return <div className={`${baseClassName}-wrapper`}>
    { PageItems.map((item, index) => {
      const isCurrent = index === pageIndex;
      return (
        <div 
          onClick={() => props.navigationCallback(index)}
          ref={isCurrent ? currentItem : null}
          key={ index }
          className={`${baseClassName}-item${isCurrent ? '--active' : ''}`}
        >
          <item.icon />
      </div>
      )
    })}
    <div ref={indicator} className={`${baseClassName}-indicator`}></div>
  </div>
}

export default Sidebar;