module.exports = (type) => {

    var regx = /(gif|jpe?g|tiff|png|webp|bmp)$/i
    var matches_array = type.match(regx);
    console.log(matches_array);
    if (matches_array == null) {
        return false;
    }
    return true;

}