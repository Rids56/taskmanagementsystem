import { FieldValues, DeepPartial, FieldPath } from 'react-hook-form';

export function getDirtyValues<T extends FieldValues>(
  data: T,
  dirtyFields: DeepPartial<Record<FieldPath<T>, any>>
): Partial<T> {
  const output: any = {};

  const process = (dataNode: any, dirtyNode: any, path: string[] = []) => {
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

  return output;
}

function setValue(obj: any, path: string[], value: any) {
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

function isObject(val: any) {
  return val && typeof val === 'object' && !Array.isArray(val);
}
