// import { Axe, Sword } from '../Item';
// import { ItemValueCalculator, WeaponCalculator } from './FactoryCalculator';

// interface ItemFactoryCon {
//   type: string;
//   calculator: ItemValueCalculator;
// }

// interface SwordFactoryCon extends ItemFactoryCon {}
// interface AxeFactoryCon extends ItemFactoryCon {}

// export class ItemFactory {
//   _type: string;
//   _calculator: ItemValueCalculator;
//   constructor({ type, calculator }: ItemFactoryCon) {
//     this._type = type;
//     this._calculator = calculator;
//   }
// }

// export class SwordFactory extends ItemFactory {
//   static instance?: SwordFactory;
//   constructor(swordFactoryConfig: SwordFactoryCon) {
//     super({ ...swordFactoryConfig });
//   }
//   static createFactory() {
//     if (this.instance === null) {
//       return new SwordFactory({
//         type: 'sword',
//         calculator: new WeaponCalculator(),
//       });
//     }
//     return this.instance;
//   }
//   createItem(name: string) {
//     const value = this._calculator.calculateItemValue();
//     const quality = this._calculator.calculateItemQuality(value);
//     return new Sword({
//       name: name,
//       type: this._type,
//       quality: quality,
//       value: value,
//       attribute: 'attack',
//     });
//   }
// }

// export class AxeFactory extends ItemFactory {
//   static instance?: AxeFactory;
//   date: Date;
//   constructor(axeFactoryConfig: AxeFactoryCon) {
//     super({ ...axeFactoryConfig });
//     this.date = new Date();
//   }
//   static createFactory() {
//     if (this.instance === undefined) {
//       return (this.instance = new AxeFactory({
//         type: 'axe',
//         calculator: new WeaponCalculator(),
//       }));
//     }
//     return this.instance;
//   }
//   createItem(name: string) {
//     const value = this._calculator.calculateItemValue();
//     const quality = this._calculator.calculateItemQuality(value);
//     return new Axe({
//       name: name,
//       type: this._type,
//       quality: quality,
//       value: value,
//       attribute: 'attack',
//     });
//   }
// }
