import React, { useEffect, useState, Children } from 'react';

import { Icon } from 'src/components/Icon/Icon';

import style from './CharacterDetail.module.css';
import PeopleImg from '../assets/img/people.png';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { GameCharacter } from 'src/Services/GameCharacter';
import { v4 } from 'uuid';
import { mountEquipmentAPI } from 'src/api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import {
  actionAddItem,
  actionRemoveItem,
  actionSetCharacterEquipment,
} from 'src/store/reducers/character';

interface CharacterDetailProps {
  children?: React.ReactNode;
}
interface CharacterUIProps {
  children?: React.ReactNode;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  children,
  ...props
}) => {
  const store = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();
  const [character, setCharcter] = useState(
    new GameCharacter(store.character, store.attribute)
  );
  const [status, setStatus] = useState({});
  const showEquipmentSlotHandleEvt = () => {};

  const mountHandleEvt = (id: number) => {
    const selected = store.bags[id];
    const slotType = selected!.equipmentType.split('_').join('').toLowerCase();
    mountEquipmentAPI(
      character._info.id,
      selected!.id,
      character._mountedEquipment[slotType].id
    )
      .then((res: AxiosResponse) => {
        //從背包拿裝備
        dispatch(actionRemoveItem(res.data.equipmentItem));
        //先拿下裝備
        character.unMountedEquipment(res.data.unequipmentItem);
        //將拿下的裝備放到背包
        if (res.data.unequipmentItem) {
          dispatch(actionAddItem(res.data.unequipmentItem));
        }
        //裝備到裝備槽
        character.mountedEquipment(res.data.equipmentItem);

        const equipments = Object.entries(character._mountedEquipment).map(
          ([key, value]) => {
            return {
              slotName: key,
              equipmentItem: value.getEquipmentItem(),
            };
          }
        );
        dispatch(actionSetCharacterEquipment(equipments as []));
        setStatus(character.getStatus());
      })
      .catch((e: AxiosError) => {
        console.log(e.response?.data);
      });
  };

  const CharacterUI: React.FC<CharacterUIProps> = ({ children, ...props }) => {
    return (
      <div className={style.Character}>
        <img src={PeopleImg} alt="" className={style.CharacterImg} />
        {Children.map(children, (child: any) =>
          React.cloneElement(child, {
            ...child.props,
          })
        )}
      </div>
    );
  };

  useEffect(() => {
    // init page to calculate state
    store.eqiupments.forEach((ep: any) => {
      character.mountedEquipment(ep.equipmentItem);
    });
    setStatus(character.getStatus());
  }, []);

  return (
    <>
      <section className="flex min-h-screen flex-wrap justify-center items-center">
        <section className={`${style.Left}`}>
          <CharacterUI>
            {store.eqiupments.map((ep: any) => {
              const slotName = ep.slotName.split('_').join('').toLowerCase();
              return (
                <div
                  className={`${style.CharacterSlot} ${style[slotName]}`}
                  key={v4()}
                  onClick={() => showEquipmentSlotHandleEvt()}
                >
                  {ep.equipmentItem !== null ? ep.equipmentItem.name : ''}
                </div>
              );
            })}
            {/* <div className={`${style.CharacterSlot} ${style.head}`}></div>
            <div className={`${style.CharacterSlot} ${style.body}`}></div>
            <div className={`${style.CharacterSlot} ${style.hands}`}></div>
            <div className={`${style.CharacterSlot} ${style.mainhand}`}></div>
            <div className={`${style.CharacterSlot} ${style.offhand}`}></div>
            <div className={`${style.CharacterSlot} ${style.lowerbody}`}></div>
            <div className={`${style.CharacterSlot} ${style.foots}`}></div> */}
          </CharacterUI>
          <div className="mt-20 text-white flex">
            <div className=" w-52">
              {Object.entries(status).map(([k, v]: any, index: number) => {
                return (
                  <div key={v4()} className="flex mb-1">
                    <p className="mr-3">{k}</p>
                    <p>{v}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex-1">
              <div className="">Level： {store.character.level}</div>
              <div className="">Money： {store.character.money}</div>
            </div>
          </div>
        </section>
        <section className="flex-1 text-white flex flex-col items-center min-h-screen">
          <h1 className=" text-4xl py-3 pr-6 text-slate-400 font-semibold">
            Bag
          </h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Quality</td>
                <td>Type</td>
                <td>EquipmentType</td>
                <td>Attribute</td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              {Object.values(store.bags).map((item) => {
                return item === null ? (
                  <tr key={v4()}></tr>
                ) : (
                  <tr key={v4()}>
                    <td>{item.name}</td>
                    <td>{item.quality}</td>
                    <td>{item.type}</td>
                    <td>{item.equipmentType}</td>
                    <td>{item.attribute}</td>
                    <td>{item.value}</td>
                    <td>
                      <button
                        className="btn px-3 py-1 min-h-fit h-10"
                        onClick={() => mountHandleEvt(item.id)}
                      >
                        mount
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default CharacterDetail;
