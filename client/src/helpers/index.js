/**
 * Remove items in data that already exist in projects
 * @param {*} projects the existing projects array
 * @param {*} data the new data array to check
 * @param {*} numResults the number of results per batch
 */
export const removeDuplicates = (projects, data, numResults) => {
  //TODO not performant as array size scales - use numResults to only check last n elements of array for duplicates
  const arrayToCheck = [...projects, ...data];
  const result = arrayToCheck.filter(function ({ _id }) {
    return !this[_id] && (this[_id] = _id);
  }, {});
  return result;
};