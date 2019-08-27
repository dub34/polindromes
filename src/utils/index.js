

export function findPalindromes(text) {
    //split source text line by line
    const rows = text.split('\n');
    let palindromes = []
    for (let i = 0; i < rows.length; i++) {
        const words = rows[i].trim().split(' ')
        //if only one word in  whole text - just check it without extra loops
        if (words.length === 1) {
            palindromes = [...palindromes, ...checkWords(words)]
        } else {
            //Some problems with such implementation. Not optimized
            palindromes = [...palindromes, ...checkPhrases(words), ...checkSentences(words), ...checkWords(words)]
        }
    }
    //make array with distinct values
    return [...new Set([...palindromes])]
}

function checkWords(words) {
    let palindromes = []
    for (let j = 0; j < words.length; j++) {
        if (isPalindrome(words[j])) {
            palindromes.push(words[j])
        }
    }
    return palindromes
}

function checkPhrases(words) {
    let phraseBuf = []
    let palindromes = []

    for (let j = 0; j < words.length; j++) {
        phraseBuf.push(words[j])

        if (isPalindrome(phraseBuf.join(" "))) {
            palindromes.push(phraseBuf.join(" "))
        } else {
            phraseBuf = [words[j]]
        }
    }
    return palindromes
}

function checkSentences(words) {
    let sentenceBuf = []
    let palindromes = []

    for (let j = 0; j < words.length; j++) {
        sentenceBuf.push(words[j])
        if (isPalindrome(sentenceBuf.join(" "))) {
            palindromes.push(sentenceBuf.join(" "))
        }
    }
    return palindromes
}

function isPalindrome(string) {
    //remove everything except of letters
    const preparedString = string.replace(/[\W_]/g, '').toLowerCase()
    const length = preparedString.length

    if (length < 3) {
        return false
    }
    //Divide string to 2 part. Check from both parts. If letters are not equal - it`s not a palindrome
    for (let i = 0; i < length / 2; i++) {
        if (preparedString[i] !== preparedString[length - i - 1]) {
            return false
        }
    }
    return true
}