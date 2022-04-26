function titleCase (string){
    const newString = string.split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
    return newString
}

export {titleCase}