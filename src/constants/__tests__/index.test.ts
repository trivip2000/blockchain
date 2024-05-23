import {
  mapCoinName,
  getSuiNumber,
  getEclipseAddress,
  getBlance,
  convertNumberToSui,
} from '../index';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';

describe('mapCoinName', () => {
  it('should map coin name correctly', () => {
    expect(mapCoinName['0x2::sui::SUI']).toBe('SUI');
  });
});

describe('getSuiNumber', () => {
  it('should return the correct SUI number', () => {
    expect(getSuiNumber('2000000000')).toBe(2);
  });
});

describe('getEclipseAddress', () => {
  it('should return the eclipsed address', () => {
    expect(getEclipseAddress('0x1234567890abcdef')).toBe('0x123...bcdef');
  });
});

describe('getBlance', () => {
  it('should return the correct balance', () => {
    const balance = 2000000000;
    const expectedBalance = balance / Number(MIST_PER_SUI);
    expect(getBlance(balance)).toBe(expectedBalance);
  });
});

describe('convertNumberToSui', () => {
  it('should return the correct SUI amount', () => {
    const amount = 2;
    const expectedAmount = amount * Number(MIST_PER_SUI);
    expect(convertNumberToSui(amount)).toBe(expectedAmount);
  });
});
