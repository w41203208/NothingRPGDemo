import { GameAxiosClient } from './axios';

export const getUserHasCharactersAPI = (userId: number) => {
  return GameAxiosClient({
    url: 'api/User/userHasCharacters',
    method: 'get',
    data: {},
    params: {
      id: userId,
    },
  });
};

export const userRegisterAPI = (num: string, pwd: string) => {
  return GameAxiosClient({
    url: 'api/User/register',
    method: 'post',
    data: {
      email: num,
      password: pwd,
    },
    params: {},
  });
};

export const userLoginAPI = (num: string, pwd: string) => {
  return GameAxiosClient({
    url: 'api/User/login',
    method: 'post',
    data: {
      email: num,
      password: pwd,
    },
    params: {},
  });
};

export const getCharacterBagAPI = (characterId: number) => {
  return GameAxiosClient({
    url: 'api/Character/characterBag',
    method: 'get',
    data: {},
    params: {
      id: characterId,
    },
  });
};
export const getCharacterEquipmentAPI = (characterId: number) => {
  return GameAxiosClient({
    url: 'api/Character/characterEquipment',
    method: 'get',
    data: {},
    params: {
      id: characterId,
    },
  });
};
export const getCharacterAttributeAPI = (characterId: number) => {
  return GameAxiosClient({
    url: 'api/Character/characterAttribute',
    method: 'get',
    data: {},
    params: {
      id: characterId,
    },
  });
};

export const getShopItemAPI = () => {
  return GameAxiosClient({
    url: 'api/Shop',
    method: 'get',
    data: {},
    params: {},
  });
};

export const buyShopItemAPI = (characterId: number, itemId: number) => {
  return GameAxiosClient({
    url: 'api/Character/buyItem',
    method: 'post',
    data: {
      characterId: characterId,
      itemId: itemId,
    },
    params: {},
  });
};

export const mountEquipmentAPI = (
  characterId: number,
  characterBagId: number,
  slotId: number
) => {
  return GameAxiosClient({
    url: 'api/Character/mountedEquipment',
    method: 'post',
    data: {
      characterId: characterId,
      characterBagId: characterBagId,
      slotId: slotId,
    },
    params: {},
  });
};

export const unMountEquipmentAPI = (characterId: number, slotId: number) => {
  return GameAxiosClient({
    url: 'api/Character/unMountedEquipment',
    method: 'post',
    data: {
      characterId: characterId,
      slotId: slotId,
    },
    params: {},
  });
};
export const userAddCharcterAPI = (userId: number, name: string) => {
  return GameAxiosClient({
    url: 'api/User/addCharacter',
    method: 'post',
    data: {
      userId: userId,
      name: name,
    },
    params: {},
  });
};
