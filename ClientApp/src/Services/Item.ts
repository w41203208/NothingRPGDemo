import { BaseItemConfig, SwordConfig, EquipmentItemConfig } from './types';

export class BaseItem {
  id: number;
  name: string;
  attribute: string;
  type: string;
  quality: string;
  value: number;
  money: number;
  constructor(itemConfig: BaseItemConfig) {
    this.id = itemConfig.id;
    this.name = itemConfig.name;
    this.attribute = itemConfig.attribute;
    this.type = itemConfig.type;
    this.quality = itemConfig.quality;
    this.value = itemConfig.value;
    this.money = itemConfig.money;
  }
}

export class EquipmentItem extends BaseItem {
  equipmentType: string;
  constructor(equipmentConfig: EquipmentItemConfig) {
    const { equipmentType } = equipmentConfig;
    super({ ...equipmentConfig });
    this.equipmentType = equipmentType;
  }
}

export class Sword extends EquipmentItem {
  constructor(swordConfig: SwordConfig) {
    super({ ...swordConfig });
  }
  printSwordName(): string {
    return 'Type：sword, Name：' + this.name;
  }
}
export class Axe extends EquipmentItem {
  constructor(swordConfig: SwordConfig) {
    super({ ...swordConfig });
  }
  printAxeName(): string {
    return 'Type：Axe, Name：' + this.name;
  }
}
