export const capitalizeWord = (text: string | null) => {
    if (!text) {
        return ''
    }

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const capitalizeWords = (text: string | null) => {
    if (!text) {
        return ''
    }

    return text
        .split(' ')
        .map((word) => capitalizeWord(word))
        .join(' ')
}

export const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(' ')

    if (words.length > wordLimit) {
        return `${words.slice(0, wordLimit).join(' ')}...`
    }

    return text
}
