export const onlyEngNum = (asValue) => {
    var regExp = /^[A-Za-z0-9]*$/g;
    return regExp.test(asValue);
};

export const removeExp = (asValue) => {
    var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    if (reg.test(asValue)) {
        console.log('here');
        console.log(asValue.replace(reg, ''));
        return asValue.replace(reg, '');
    } else {
        return asValue;
    }
};
