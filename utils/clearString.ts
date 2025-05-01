export const clearString = (validChars: string, inputString: string): string => {
    const regex = new RegExp('[^' + validChars + ']', 'g')
    return inputString.replace(regex, '')
}