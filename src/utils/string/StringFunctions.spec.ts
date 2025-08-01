import { capitalizeWord, capitalizeWords, limitWords } from './StringFunctions'

describe('capitalizeWord function', () => {
    it('should capitalize the first letter of a word', () => {
        const word = 'LOREM'
        const result = capitalizeWord(word)
        expect(result).to.equal('Lorem')
    })
})

describe('capitalizeWords function', () => {
    it('should capitalize the first letter of each word', () => {
        const words = 'lorem ipsum dolor sit amet'
        const result = capitalizeWords(words)
        expect(result).to.equal('Lorem Ipsum Dolor Sit Amet')
    })
})

describe('limitWords function', () => {
    it('should not truncate text when word count is less than or equal to the word limit', () => {
        const text = 'Lorem ipsum dolor sit amet'
        const wordLimit = 5
        const result = limitWords(text, wordLimit)
        expect(result).to.equal(text)
    })

    it('should truncate text and add ellipsis when word count exceeds the word limit', () => {
        const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
        const wordLimit = 5
        const result = limitWords(text, wordLimit)
        expect(result).to.equal('Lorem ipsum dolor sit amet...')
    })

    it('should handle empty text', () => {
        const text = ''
        const wordLimit = 10
        const result = limitWords(text, wordLimit)
        expect(result).to.equal('')
    })

    it('should handle word limit of 0', () => {
        const text = 'Lorem ipsum dolor sit amet'
        const wordLimit = 0
        const result = limitWords(text, wordLimit)
        expect(result).to.equal('...')
    })
})
