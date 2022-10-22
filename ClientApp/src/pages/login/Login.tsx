import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from 'src/store/reducers/auth';
import { AppDispatch, RootState } from 'src/store';
import { useSelector } from 'react-redux';

// Component
import { Container } from '../../components/Container/Container';

// Resources
import style from './Login.module.css';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({ ...restProps }) => {
  //router
  const history = useHistory();
  // redux
  const dispatch = useDispatch<AppDispatch>();
  // declare state
  const [number, setNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginHandleEvt = async () => {
    const res = await dispatch(userLogin({ num: number, pwd: password }));
    if (res.meta.requestStatus === 'fulfilled') {
      history.push('/selectcharacter');
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Container className={'mx-auto'}>
        <section className="flex justify-center items-center min-h-screen">
          <section className="flex flex-col">
            <h2 className={style.header}>Login</h2>
            <div className="mb-3">
              <p className={style.Login_p}>Number:</p>
              <input
                type="text"
                className={style.Login_input}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <p className={style.Login_p}>Password:</p>
              <input
                type="text"
                className={style.Login_input}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={`flex justify-end items-center ${style.Control}`}>
              <button
                className={`${style.Login_btn} ${style.Register}`}
                onClick={() => {
                  history.push('/register');
                }}
              >
                Register
              </button>
              <button
                className={`${style.Login_btn} ${style.Login}`}
                onClick={() => loginHandleEvt()}
              >
                Login
              </button>
            </div>
          </section>
        </section>
      </Container>
    </>
  );
};

export default Login;
