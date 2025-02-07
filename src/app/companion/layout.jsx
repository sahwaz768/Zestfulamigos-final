'use client';
import withAuth from '../hoc/wihAuth';

const CompanionLayout = ({ children }) => {
  console.log('Companion Layout');
  return <div>{children}</div>;
};

export default withAuth(CompanionLayout);
