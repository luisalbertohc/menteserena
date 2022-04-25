export const constructArrayFieldValidation = (
  getValues: (param: string) => any[],
  entity: string,
  fields: string[],
  single_fields?: string[]
): string[] => {
  const entity_length = getValues(entity).length;

  return Array.from(Array(entity_length).keys()).reduce((acc, idx) => {
    const name_index = `${entity}.${idx}`;
    return [...acc, ...fields.map(field => `${name_index}.${field}`)];
  }, single_fields ?? []);
};
