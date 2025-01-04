import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import { datafetched } from "../../Redux/auth/auth.reducer";
import { decodeAccessToken } from "../../utils/common.utils";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const tokenredux = useSelector((state) => state.AuthReducer.data);
    useEffect(() => {
      const cookies = parseCookies();
      const token = cookies['x-token'];
      if (!token && !tokenredux) {
        redirect('/');
      } else if (!tokenredux) {
        dispatch(datafetched(decodeAccessToken(token).decodedToken));
      }
    }, [tokenredux, dispatch]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
