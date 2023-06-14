import { Fragment, ReactNode } from 'react';
import MainHeader from './MainHeader';

const Layout = (props: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
