'use client';
import withAuth from '../../shared/hoc/wihAuth';

const CompanionLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default withAuth(CompanionLayout);
