import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import {
  actionSetCharacter,
  actionSetCharacterAttribute,
  actionSetCharacterBag,
  actionSetCharacterEquipment,
  actionInitCharacter,
} from 'src/store/reducers/character';
import {
  getCharacterAttributeAPI,
  getUserHasCharactersAPI,
  getCharacterEquipmentAPI,
  getCharacterBagAPI,
  userAddCharcterAPI,
} from 'src/api/api';
import { Icon } from '../components/Icon/Icon';

import CharacterImg from '../assets/img/character.png';
import style from './SelectCharacter.module.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CharacterAttributes } from 'src/Services/types';
import { GameCharacter } from 'src/Services/GameCharacter';

import { BackDrop } from 'src/components/Modal/BackDrop';
import { Modal } from 'src/components/Modal/Modal';
import { ModalContent } from 'src/components/Modal/ModalContent';

interface SelectCharacterProps {
  children?: React.ReactNode;
}

interface Character {
  id: number;
  name: string;
  level: number;
  xp: number;
  money: number;
}

interface CharacterProps {
  data?: Character;
}

const SelectCharacter: React.FC<SelectCharacterProps> = ({ ...props }) => {
  const history = useHistory();
  const store = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState<Character[]>();
  const selectCharacterHandleEvt = (id: number) => {
    const selected = characters?.filter((c) => c.id === id);
    if (selected?.length !== 0 && selected !== undefined) {
      Promise.all([
        getCharacterEquipmentAPI(selected[0].id),
        getCharacterAttributeAPI(selected[0].id),
        getCharacterBagAPI(selected[0].id),
      ]).then((values) => {
        let attributes = {} as CharacterAttributes;
        let equipments = values[0].data.equipments;
        let bags = values[2].data.items;
        values[1].data.attributes.forEach((attrs: any) => {
          (attributes as any)[attrs.name.toLowerCase()] = attrs.value;
        });
        dispatch(
          actionInitCharacter({
            ch: selected[0],
            chAttr: attributes,
            eq: equipments,
            bags: bags,
          })
        );
      });

      history.push('/');
    }
  };
  const createCharacterHandleEvt = () => {
    if (name === null || name === '') {
      closeModalHandleEvt();
      return;
    }
    userAddCharcterAPI(store.user.id, name).then((res: AxiosResponse) => {
      console.log(res.data);
    });
    setName('');
    closeModalHandleEvt();
  };
  const closeModalHandleEvt = () => {
    setOpenCreateModal(false);
  };
  useEffect(() => {
    getUserHasCharactersAPI(store.user.id).then((res: AxiosResponse) => {
      setCharacters(res.data);
    });
  }, []);
  const Character = ({ data }: CharacterProps) => {
    return (
      <>
        <div
          className={`m-2 flex bg-white ${style.SelectedCard}`}
          onClick={() => selectCharacterHandleEvt(data?.id!)}
        >
          <div className="px-4 bg-slate-500 flex justify-center items-center">
            <Icon
              width={50}
              height={50}
              imgSrc={CharacterImg}
              className=""
            ></Icon>
          </div>
          <div className="">
            <div className="ml-2 text-3xl">
              <div className="flex items-center">
                <p className="mr-5">Level:</p>
                <p>{data?.level}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-5">Name:</p>
                <p>{data?.name}</p>
              </div>
            </div>
            <div className="flex border-slate-500 border-t-2 text-xl">
              <div className="flex items-center min-w-fit pl-3 pr-10 py-3 border-r-2 border-slate-500">
                <p className="mr-5">Money:</p>
                <p>{data?.money}</p>
              </div>
              <div className="flex items-center min-w-fit pl-3 pr-10 py-3">
                <p className="mr-5">XP:</p>
                <p>{data?.xp}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center items-center">
          {characters?.map((c) => {
            return <Character data={c} key={`characters-${c.id}`} />;
          })}
          <div className="flex">
            <button
              className="btn"
              onClick={() => setOpenCreateModal(!openCreateModal)}
            >
              Add Character
            </button>
          </div>
        </div>
        {openCreateModal && (
          <Modal
            className="bg-white rounded"
            size="base"
            onClose={() => closeModalHandleEvt()}
          >
            <ModalContent className=" py-3 px-5">
              <h1 className="text-center text-2xl px-4 py-1 pb-1 border-b-2 border-black">
                Create Charater
              </h1>
              <div className="py-2 w-full flex flex-col">
                <p className=" text-lg">Name:</p>
                <input
                  onChange={(e: any) => setName(e.target.value)}
                  type="text"
                  className=" outline-none border-2 rounded border-black px-2 py-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className=" btn"
                  onClick={() => createCharacterHandleEvt()}
                >
                  Create
                </button>
              </div>
            </ModalContent>
          </Modal>
        )}
      </section>
    </>
  );
};

export default SelectCharacter;
