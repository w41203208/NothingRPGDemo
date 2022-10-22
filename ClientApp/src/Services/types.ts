export interface BaseCharacterInfo {
  id: number;
  name: string;
  level: number;
  xp: number;
  money: number;
}
export interface CharacterAttributes extends Record<string | number, number> {
  hp: number;
  mp: number;
  attack: number;
  mattack: number;
  intelligence: number;
  luck: number;
  strength: number;
  dexterity: number;
}
export interface BaseItemConfig {
  id: number;
  name: string;
  attribute: string;
  type: string;
  quality: string;
  value: number;
  money: number;
}

export interface EquipmentItemConfig extends BaseItemConfig {
  equipmentType: string;
}
export interface SwordConfig extends EquipmentItemConfig {
  test: string;
}
