export const getFormattedDate = (date:string) => {
    let formattedDate = date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
    return formattedDate;
}

export const colorOfStatus = (status: string | undefined) => {
    return status == 'Pending' ? ['bg-blue-100', 'text-blue-800'] : status == 'In progress' ?
        ['bg-green-100', 'text-green-800'] : ['bg-gray-100', 'text-gray-800']
}
