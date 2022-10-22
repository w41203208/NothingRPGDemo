import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import { Layout } from './components/Layout/Layout';
import Login from './pages/login/Login';
import { Home } from './pages/Home';

// Component
import { NavMenu } from './components/Nav/NavMenu';
import { NavButton } from './components/Nav/NavBtn';
import { NavList } from './components/Nav/NavList';
import { Icon } from './components/Icon/Icon';
import { PrivateRoute } from './pages/login/PrivateRoute';

// Scource
import HomeImg from './assets/img/home.png';
import EquipImg from './assets/img/equip.png';
import ShopImg from './assets/img/shop.png';
import UserImg from './assets/img/user.png';
import Register from './pages/login/Register';

import './custom.css';
import { RootState } from './store';

const CharacterDetail = lazy(() => import('./pages/CharacterDetail'));
const SelectCharacter = lazy(() => import('./pages/SelectCharacter'));
const Shop = lazy(() => import('./pages/Shop'));

const App = () => {
  const { isLogin, user } = useSelector((state: RootState) => state.auth);
  const { isSeleted } = useSelector((state: RootState) => state.character);
  return (
    <Layout className={' bg-zinc-800'}>
      {isLogin && isSeleted && (
        <NavMenu className={'bg-neutral-900 flex justify-between'}>
          <NavList className="flex justify-center items-center">
            <NavButton text={'Home'} path={'/'}>
              <Icon width={20} height={20} imgSrc={HomeImg} />
            </NavButton>
            <NavButton text={'Equipment'} path={'/characterdetail'}>
              <Icon width={20} height={20} imgSrc={EquipImg} />
            </NavButton>
            <NavButton text={'Shop'} path={'/shop'}>
              <Icon width={23} height={23} imgSrc={ShopImg} />
            </NavButton>
          </NavList>
          <div className="flex justify-center items-center text-white">
            <div className=" rounded-full p-2 bg-slate-400 flex justify-center items-center mr-2">
              <Icon width={23} height={23} imgSrc={UserImg} />
            </div>
            {user.email}
          </div>
        </NavMenu>
      )}
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute isLoggedIn={isLogin}>
          <Route exact path="/" component={Home}></Route>
          <Suspense fallback={<h1>Still loading....</h1>}>
            <Route path="/selectcharacter" component={SelectCharacter} />
            <Route path="/characterdetail" component={CharacterDetail} />
            <Route path="/shop" component={Shop} />
          </Suspense>
          {/* <Route path="/character" component={} /> */}
        </PrivateRoute>
      </Switch>
    </Layout>
  );
};
export default App;
