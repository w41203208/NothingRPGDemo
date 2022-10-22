export interface ItemValueCalculator {
  calculateItemValue(): number;
  calculateItemQuality(v: number): string;
}

export class WeaponCalculator implements ItemValueCalculator {
  calculateItemValue(): number {
    let value;
    let variant = Math.floor(Math.random() * 1000) + 1;
    if (variant >= 850) {
      value = Math.floor(Math.random() * 11) + 40;
    } else if (variant >= 700 && variant < 850) {
      value = Math.floor(Math.random() * 14) + 26;
    } else {
      value = Math.floor(Math.random() * 16) + 10;
    }
    return value;
  }
  calculateItemQuality(v: number): string {
    let quality;
    if (v >= 45) {
      quality = 'Legendary';
    } else if (v >= 38) {
      quality = 'Epic';
    } else if (v >= 25) {
      quality = 'Rare';
    } else if (v >= 15) {
      quality = 'Uncommon';
    } else {
      quality = 'common';
    }
    return quality;
  }
}

export class WearItemCalculator implements ItemValueCalculator {
  calculateItemValue(): number {
    let value;
    let variant = Math.floor(Math.random() * 1000) + 1;
    if (variant >= 850) {
      value = Math.floor(Math.random() * 4) + 7;
    } else if (variant >= 700 && variant < 850) {
      value = Math.floor(Math.random() * 3) + 4;
    } else {
      value = Math.floor(Math.random() * 3) + 1;
    }
    return value;
  }
  calculateItemQuality(v: number): string {
    let quality;
    if (v >= 9) {
      quality = 'Legendary';
    } else if (v >= 7) {
      quality = 'Epic';
    } else if (v >= 5) {
      quality = 'Rare';
    } else if (v >= 3) {
      quality = 'Uncommon';
    } else {
      quality = 'common';
    }
    return quality;
  }
}
