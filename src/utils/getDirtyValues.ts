import { DeepPartial, FieldPath, FieldValues } from 'react-hook-form';

import { IKeyedObject } from '../pages/interfaceType';

export function getDirtyValues<T extends FieldValues>(
  data: T,
  dirtyFields: DeepPartial<Record<FieldPath<T>, IKeyedObject>>
): Partial<T> {
  const output: IKeyedObject = {};

  const process = (
    dataNode: IKeyedObject,
    dirtyNode: IKeyedObject,
    path: string[] = []
  ) => {
    if (!dirtyNode) return;

    Object.keys(dirtyNode).forEach((key) => {
      const isDirty = dirtyNode[key];
      const value = dataNode?.[key];

      const currentPath = [...path, key];

      // nested object
      if (isObject(isDirty)) {
        process(value, isDirty, currentPath);
        return;
      }

      // array handling (mark whole array dirty in RHF)
      setValue(output, currentPath, value);
    });
  };

  process(data, dirtyFields);

  return output as Partial<T>;
}

function setValue(obj: IKeyedObject, path: string[], value: IKeyedObject) {
  let current = obj;

  path.forEach((key, index) => {
    if (index === path.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  });
}

function isObject(val: IKeyedObject) {
  return val && typeof val === 'object' && !Array.isArray(val);
}
