const searchIndexElement = (element, htmlСollection, searchValue) => {
  for (let i = 0; i < htmlСollection.length; i++) {
    if (element.target[searchValue] === htmlСollection[i][searchValue]) {
      return i;
    }
  }
};
export default searchIndexElement;
