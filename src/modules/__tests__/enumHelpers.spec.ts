import { expect, it, describe } from 'vitest';
import { getEnumKeys, getEnumValues, isValueInEnum, isKeyInEnum } from '@/modules/commonFunctions/enumHelpers';

enum testEnum {
  key1 = 'value1',
  key2 = 'value2',
  key3 = 'value3',
}

describe('enumHelpers', () => {
  describe('getEnumKeys', () => {
    it('should correctly return all enum keys', () => {
      expect(getEnumKeys(testEnum)).toEqual(['key1', 'key2', 'key3']);
    });
  });

  describe('getEnumValues', () => {
    it('should correctly return all enum values', () => {
      expect(getEnumValues(testEnum)).toEqual(['value1', 'value2', 'value3']);
    });
  });

  describe('isValueInEnum', () => {
    it('should return true if value is in enum', () => {
      expect(isValueInEnum(testEnum, 'value3')).toBeTruthy();
    });
  });

  describe('isKeyInEnum', () => {
    it('should return true if key is in enum', () => {
      expect(isKeyInEnum(testEnum, 'key1')).toBeTruthy();
    });
  });
});
