function buildParams(validParams, body){
    let params = {};

    validParams.array.forEach(attr => {
        if(Object.prototype.hasOwnProperty.call(body, attr))
        params[attr] = body[attr];
    });

    return params
}

module.exports = {buildParams}