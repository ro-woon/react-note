const getStandardName = (name: string) => { // 첫 글자만 upper case로
    return (
        name?.slice(0, 1).toUpperCase() + name?.slice(1, name.length).toLocaleLowerCase()
    )
}

export default getStandardName;