'use client';
import withAuth from '../hoc/wihAuth';

const CompanionLayout = ({ children }) => {Ī
  return <div>{children}</div>;
};

export default withAuth(CompanionLayout);
