export const RemoveDuplicateItemList = (list) => {
    const uniqueItems = []
    list.forEach((item) => {
        if (uniqueItems.indexOf(item) < 0) {
            uniqueItems.push(item);
        }
    })

    return uniqueItems.sort()
}