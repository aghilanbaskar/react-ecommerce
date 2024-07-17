import { useNavigate } from 'react-router-dom';
import React, { ComponentType } from 'react';

export const withRouter = <P extends object>(Component: ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props: P) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
