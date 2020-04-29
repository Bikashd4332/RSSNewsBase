/*
 * Function to find the objects that have their property modified
 * params constObjs Array<{}> - to which we will compare for modification
 * params mutatedObjs Array<{}> - which we will be compairing against.
 * returns Array<{}> - The array of mutatedObjs
 */
const selectionDiff = (constObjs, mutatedObjs, propName = "selected") => {
  // Since both the objects are not same we don't know
  // which one updated which one is not
  if (constObjs.length !== mutatedObjs.length) {
    return;
  }
  const diffObjs = [];
  constObjs.forEach((obj, index) => {
    if (obj[propName] !== mutatedObjs[index][propName]) {
      diffObjs.push(mutatedObjs[index]);
    }
  });
  return diffObjs;
};

export default selectionDiff;
