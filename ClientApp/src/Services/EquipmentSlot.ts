import { EquipmentItem } from './Item';

export class EquipmentSlot {
  id: number;
  _equipment: EquipmentItem | null;
  constructor(id: number) {
    this._equipment = null;
    this.id = id;
  }
  getEquipmentItem() {
    return this._equipment;
  }
  setEquipmentItem(equipment: EquipmentItem | null) {
    if (equipment === null) {
      this._equipment = null;
    }
    this._equipment = equipment;
  }
}

export class Head extends EquipmentSlot {}
export class Body extends EquipmentSlot {}
export class Hands extends EquipmentSlot {}
export class MainHand extends EquipmentSlot {}
export class OffHand extends EquipmentSlot {}
export class LowerBody extends EquipmentSlot {}
export class Foots extends EquipmentSlot {}
