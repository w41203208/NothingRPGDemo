import {
  Body,
  EquipmentSlot,
  Foots,
  Hands,
  Head,
  LowerBody,
  MainHand,
  OffHand,
} from './EquipmentSlot';
import { BaseItem, EquipmentItem } from './Item';
import { BaseCharacterInfo, CharacterAttributes } from './types';

export class GameCharacter {
  _info: BaseCharacterInfo;
  _status: CharacterAttributes;
  _mountedEquipment: Record<string, EquipmentSlot>;
  constructor(info: BaseCharacterInfo, status: CharacterAttributes) {
    this._info = info;
    this._status = status;
    this._mountedEquipment = {
      head: new Head(1),
      body: new Body(2),
      hands: new Hands(3),
      mainhand: new MainHand(4),
      offhand: new OffHand(5),
      lowerbody: new LowerBody(6),
      foots: new Foots(7),
    };
  }
  mountedEquipment(equipment: EquipmentItem) {
    if (equipment === null) return;
    const type = equipment.equipmentType.split('_').join('').toLowerCase();
    const slot = this._mountedEquipment[type];
    if (slot === null) return;
    const attr = equipment.attribute.toLocaleLowerCase();
    if (!this._status.hasOwnProperty(attr)) return;
    slot.setEquipmentItem(equipment);
    const new_status = { ...this._status };
    new_status[attr] = new_status[attr] + equipment.value;
    this._status = { ...new_status };
  }
  unMountedEquipment(equipment: EquipmentItem) {
    if (equipment === null) return;
    const type = equipment.equipmentType.split('_').join('').toLowerCase();
    const slot = this._mountedEquipment[type];
    if (slot === null) return;
    const attr = equipment.attribute.toLocaleLowerCase();
    if (!this._status.hasOwnProperty(attr)) return;
    slot.setEquipmentItem(null);
    const new_status = { ...this._status };
    new_status[attr] = new_status[attr] - equipment.value;
    this._status = { ...new_status };
  }
  getStatus(): CharacterAttributes {
    return this._status;
  }
  buyItem(Item: BaseItem) {}
}
