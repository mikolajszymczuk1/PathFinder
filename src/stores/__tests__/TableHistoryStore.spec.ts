import { createPinia, setActivePinia } from "pinia";
import { expect, describe, it, beforeEach } from "vitest";
import { useTableHistoryStore } from "../TableHistoryStore";

describe('TableHistoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    it('Should return undefined with no history pushed', () => {
      const store = useTableHistoryStore();
      expect(store.getPreviousTable()).toEqual(undefined);
    });

    it('Should return undefined with no history pushed', () => {
      const store = useTableHistoryStore();
      expect(store.getNextTable()).toEqual(undefined);
    });

    it('Should return previous table with history pushed', () => {
      const store = useTableHistoryStore();
      const testString = 'there should be history hash value';

      // Set history manually
      store._tables.push(testString);
      store._tables.push(testString);
      store.pointer = 1

      expect(store.getPreviousTable()).toEqual(testString);
    });

    it('Should return next table with history pushed', () => {
      const store = useTableHistoryStore();
      const testString = 'there should be history hash value';

      // Set history manually
      store._tables.push(testString);
      store._tables.push(testString);
      store.pointer = 0;

      expect(store.getNextTable()).toEqual(testString);
    });
  });

  describe('actions', () => {
    it('Should push data o history', () => {
      const store = useTableHistoryStore();
      const testTable = [['a', 'a', 'a']];

      store.pushHistory(testTable);
      expect({
        tables: store._tables,
        pointer: store.pointer,
      }).toStrictEqual({
        tables: ['3a'],
        pointer: 0
      });
    });

    it('Should pop history', () => {
      const store = useTableHistoryStore();

      store._tables = ['3a', '4a', '5a'];
      store.pointer = 2;

      store.popHistory();

      expect({
        tables: store._tables,
        pointer: store.pointer,
      }).toStrictEqual({
        tables: ['4a', '5a'],
        pointer: 1,
      });
    });

    it('Should change table length', () => {
      const store = useTableHistoryStore();
      store.setMaxLength(4);

      expect(store.length).toBe(4);
    });

    it('Should change table length and remove overflowing data', () => {
      const store = useTableHistoryStore();

      store._tables = ['1a', '2a', '3a', '4a', '5a', '6a'];
      store.pointer = 5;
      store.length = 6;

      store.setMaxLength(3);

      expect({
        tables: store._tables,
        pointer: store.pointer,
      }).toStrictEqual({
        tables: ['4a', '5a', '6a'],
        pointer: 2,
      });
    });
  });
});
