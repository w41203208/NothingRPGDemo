import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from 'src/store/reducers/auth';
import { AppDispatch, RootState } from 'src/store';
import { useSelector } from 'react-redux';

// Components
import { Icon } from 'src/components/Icon/Icon';
import { Container } from '../../components/Container/Container';

// Sources
import ArrowImg from '../../assets/img/arrow.png';
import style from './Login.module.css';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({ ...restProps }) => {
  //router
  const history = useHistory();
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { errorMsg } = useSelector((state: RootState) => state.auth);
  // declare state
  const [number, setNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const registerHandleEvt = async () => {
    const res = await dispatch(userRegister({ num: number, pwd: password }));
    if (res.meta.requestStatus === 'fulfilled') {
      history.push('/login');
    }
  };
  const goToLoginPageHandleEvt = () => {
    history.push('/login');
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Container className={'mx-auto'}>
        <section className="flex justify-center items-center min-h-screen">
          <section className="flex flex-col">
            <h2 className={style.header}>Register</h2>
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
            <div
              className={`flex justify-end items-end relative ${style.Control}`}
            >
              {errorMsg !== '' && (
                <p className="text-red-600 mr-2 text-sm absolute left-0 bottom-0">
                  {errorMsg}
                </p>
              )}
              <button
                className={`${style.Login_btn} ${style.Register} ${style.Login_link}`}
                onClick={() => registerHandleEvt()}
              >
                Register
              </button>
            </div>
            <div
              className="flex mt-7 justify-center items-center cursor-pointer text-gray-400 hover:text-gray-100 group"
              onClick={() => goToLoginPageHandleEvt()}
            >
              <Icon
                width={10}
                height={10}
                imgSrc={ArrowImg}
                className="mr-2 transition group-hover:-translate-x-1"
              />
              <p className="transition group-hover:translate-x-1">
                go back to Login
              </p>
            </div>
          </section>
        </section>
      </Container>
    </>
  );
};

export default Register;
