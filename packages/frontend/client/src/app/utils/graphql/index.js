export const generateCacheUpdate = (mutationName, query, queryName) => ({
  update(cache, { data }) {
    const queryData = cache.readQuery({ query })[queryName];
    const newData = {};
    newData[queryName] = queryData.concat(data[mutationName]);

    cache.writeQuery({
        query,
        data: newData,
    });
  }
})