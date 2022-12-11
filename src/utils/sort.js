/**
 * 
 * @param {String} key 
 * @param {Object} a 
 * @param {Object} b 
 * @param {Number} order 
 */
const leveledSort = (key, a, b, order = 1) => {
    const keys = key.split('.');
    let c = 0;
    let valueA = a;
    let valueB = b;
    for (let key in keys) {
        key = keys[key];
        valueA = valueA[key];
        valueB = valueB[key];
    }
    if (valueA > valueB) {
        c += order;
    }
    else if (valueA < valueB) {
        c -= order;
    }
    return c;
}

/**
 * 
 * @param {Array} data 
 * @param {Number} limit 
 * @param {Number} skip 
 */
const paginate = (data, limit, skip) => {
    return data.splice(skip, skip + limit);
}

module.exports = {
    leveledSort,
    paginate
}