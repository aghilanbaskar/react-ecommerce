import { Outlet } from 'react-router-dom';
import '@/scss/default.scss';
import Header from '@/components/Header';
import Footer from '../components/Footer';

const MainLayouts = () => {
  return (
    <>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayouts;
