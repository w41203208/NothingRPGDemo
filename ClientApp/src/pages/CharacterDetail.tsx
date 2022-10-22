import React, { useEffect, useState, Children } from 'react';

import style from './CharacterDetail.module.css';
import PeopleImg from '../assets/img/people.png';
import { useSelector, batch } from 'react-redux';
import { RootState } from 'src/store';
import { GameCharacter } from 'src/Services/GameCharacter';
import { v4 } from 'uuid';
import { mountEquipmentAPI, unMountEquipmentAPI } from 'src/api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import {
  actionAddItem,
  actionRemoveItem,
  actionSetCharacterEquipment,
  actionSetCharacterAttribute,
  actionTest,
} from 'src/store/reducers/character';

interface CharacterDetailProps {
  children?: React.ReactNode;
}
interface CharacterUIProps {
  children?: React.ReactNode;
}
interface CharacterSlotProps {
  children?: React.ReactNode;
  slotName: string;
  equipment: any;
  onClick: Function;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  children,
  ...props
}) => {
  const store = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();
  const [character, setCharcter] = useState(
    new GameCharacter(store.character, {
      hp: 1,
      mp: 1,
      attack: 1,
      mattack: 1,
      intelligence: 1,
      luck: 1,
      strength: 1,
      dexterity: 1,
    })
  );
  const [status, setStatus] = useState({});

  const unMountHandleEvt = (id: number) => {
    unMountEquipmentAPI(character._info.id, id).then((res: AxiosResponse) => {
      batch(() => {
        character.unMountedEquipment(res.data.unequipmentItem);
        if (res.data.unequipmentItem) {
          dispatch(actionAddItem(res.data.unequipmentItem));
        }
        const equipments = Object.entries(character._mountedEquipment).map(
          ([key, value]) => {
            return {
              slotName: key,
              equipmentItem: value.getEquipmentItem(),
            };
          }
        );
        dispatch(actionSetCharacterEquipment(equipments as []));
        dispatch(actionSetCharacterAttribute(character.getStatus()));
      });
    });
  };

  const mountHandleEvt = (id: number) => {
    const selected = store.bags[id];
    const slotType = selected!.equipmentType.split('_').join('').toLowerCase();
    mountEquipmentAPI(
      character._info.id,
      selected!.id,
      character._mountedEquipment[slotType].id
    )
      .then((res: AxiosResponse) => {
        batch(() => {
          //從背包拿裝備
          dispatch(actionRemoveItem(selected!));
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
          dispatch(actionSetCharacterAttribute(character.getStatus()));
        });
      })
      .catch((e: AxiosError) => {
        console.log(e.response?.data);
      });
  };

  const CharacterSlot: React.FC<CharacterSlotProps> = ({
    children,
    slotName,
    equipment,
    onClick,
    ...props
  }) => {
    const [open, setOpen] = useState(false);
    const handleBlurEvt = () => {
      setOpen(false);
    };
    const handleClick = (id: number) => {
      onClick(id);
    };
    return (
      <>
        <div
          className={`${style.CharacterSlot} ${style[slotName]} relative `}
          tabIndex={0}
          // onBlur={() => handleBlurEvt()}
        >
          <div
            className={`cursor-pointer w-full h-full absolute`}
            onClick={() => setOpen(!open)}
          ></div>
          {children}
          {open && equipment && (
            <div className=" absolute top-1/2 left-1/2 bg-gray-500 border border-black z-50">
              <div className="header border-b border-black">
                <h1 className=" whitespace-nowrap px-3 py-1">
                  {equipment.name}
                </h1>
              </div>
              <div className="flex content">
                <div className="left mr-1">
                  <p>EquipmentType：</p>
                  <p>Type：</p>
                  <p>Quality：</p>
                  <p>Attribute：</p>
                  <p>Value</p>
                </div>
                <div className="right flex-1 flex-col items-end">
                  <p>{equipment.equipmentType}</p>
                  <p>{equipment.itemType}</p>
                  <p className={style[equipment.quality]}>
                    {equipment.quality}
                  </p>
                  <p>{equipment.attribute}</p>
                  <p>{equipment.value}</p>
                </div>
              </div>
              <div className="footer px-1 py-1 pt-2 flex justify-end">
                <button
                  className="px-3 py-1 bg-red-600 rounded-md font-bold"
                  onClick={() => handleClick(equipment.id)}
                >
                  UNMOUNT
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
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
    dispatch(actionSetCharacterAttribute(character.getStatus()));
  }, []);

  return (
    <>
      <section className="flex min-h-screen flex-wrap justify-center items-center">
        <section className={`${style.Left}`}>
          <CharacterUI>
            {store.eqiupments.map((ep: any) => {
              const slotName = ep.slotName.split('_').join('').toLowerCase();
              return (
                <CharacterSlot
                  key={v4()}
                  slotName={slotName}
                  equipment={ep.equipmentItem}
                  onClick={unMountHandleEvt}
                >
                  {ep.equipmentItem !== null ? ep.equipmentItem.name : ''}
                </CharacterSlot>
              );
            })}
          </CharacterUI>
          <div className="mt-20 text-white flex">
            <div className=" w-52">
              {Object.entries(store.attribute).map(
                ([k, v]: any, index: number) => {
                  return (
                    <div key={v4()} className="flex mb-1">
                      <p className="mr-3">{k}</p>
                      <p>{v}</p>
                    </div>
                  );
                }
              )}
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
