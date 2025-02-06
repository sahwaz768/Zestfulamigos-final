'use client'
import withAuth from "../hoc/wihAuth";

const UserLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default withAuth(UserLayout);
