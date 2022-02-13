exports.dataencode = (str) =>{
    return atob(str);
}

exports.datadecode = (str) =>{
    return btoa(str);
}