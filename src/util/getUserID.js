module.exports = (info) => {
    var result = JSON.parse(info);
    return result.data.accountId
}