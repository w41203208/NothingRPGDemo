import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GameCharacter } from 'src/Services/GameCharacter';
import { EquipmentItem } from 'src/Services/Item';
import { CharacterAttributes } from 'src/Services/types';

interface Character {
  id: number;
  name: string;
  level: number;
  xp: number;
  money: number;
}

interface MountEquipmentPayload {
  originalBagItem: EquipmentItem;
  equipmentItem: EquipmentItem;
  unequipmentItem: EquipmentItem;
}
interface InitCharacterPayload {
  chAttr: CharacterAttributes;
  ch: Character;
  eq: [];
  bags: [];
}

const CharacterReducer = createSlice({
  name: 'character',
  initialState: {
    isSeleted: false,
    character: {} as Character,
    attribute: {} as CharacterAttributes,
    eqiupments: [],
    bags: {} as Record<string, EquipmentItem | null>,
    test: 1,
  },
  reducers: {
    actionTest(state) {
      state.test++;
    },
    actionInitCharacter(state, action: PayloadAction<InitCharacterPayload>) {
      const { ch, chAttr, eq, bags } = action.payload;
      state.character = ch;
      state.isSeleted = true;
      state.attribute = chAttr;
      state.eqiupments = eq;
      bags.forEach((item: any) => {
        state.bags[item.id] = item;
      });
    },
    actionSetCharacter(state, action: PayloadAction<Character>) {
      state.character = action.payload;
      state.isSeleted = true;
    },
    actionSetCharacterAttribute(
      state,
      action: PayloadAction<CharacterAttributes>
    ) {
      state.attribute = action.payload;
    },
    actionSetCharacterEquipment(state, action: PayloadAction<[]>) {
      state.eqiupments = action.payload;
    },
    actionSetCharacterBag(state, action: PayloadAction<EquipmentItem[]>) {
      action.payload.forEach((item) => {
        state.bags[item.id] = item;
      });
    },

    actionBuyItem(state, action: PayloadAction<EquipmentItem>) {
      state.character.money = state.character.money - action.payload.money;
      state.bags[action.payload.id] = action.payload;
    },
    actionAddItem(state, action: PayloadAction<EquipmentItem>) {
      state.bags[action.payload.id] = action.payload;
    },
    actionRemoveItem(state, action: PayloadAction<EquipmentItem>) {
      state.bags[action.payload.id] = null;
    },
    // actionMountEquipment(state, action: PayloadAction<MountEquipmentPayload>) {
    //   const { originalBagItem, equipmentItem, unequipmentItem } =
    //     action.payload;
    //   state.bags[originalBagItem.id] = null;
    //   if (unequipmentItem) {
    //     state.bags[unequipmentItem.id] = unequipmentItem;
    //   }
    // },
  },
});

export const {
  actionSetCharacter,
  actionSetCharacterAttribute,
  actionSetCharacterEquipment,
  actionSetCharacterBag,
  actionAddItem,
  actionBuyItem,
  actionRemoveItem,
  actionInitCharacter,

  actionTest,
} = CharacterReducer.actions;
export default CharacterReducer.reducer;
