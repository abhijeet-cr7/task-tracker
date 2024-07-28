import React from 'react';
import {GridContainerProps} from "./GridList";
import "./GridContainer.css"; 

const GridContainer = (props : GridContainerProps ) => {
  const {children, classNames} = props;
    return (
    <div className={`GridClass ${classNames}`}>
      {children}
    </div>
  )
}

export default GridContainer;