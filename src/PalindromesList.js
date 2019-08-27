import React, {useMemo} from 'react'

export default ({palindromes = [], isSearchLongest = false}) => {

    const longest = useMemo(() => {
        let longestIdx = null
        if (isSearchLongest) {
            longestIdx = palindromes.indexOf(palindromes.reduce((a, b) => a.length < b.length ? b : a, ""))
        }
        return longestIdx
    }, [palindromes, isSearchLongest]);

    return (<>
        <h2>Palindromes found</h2>
        <ul className={'foundPalindromes'}>
            {palindromes.map((item, i) => <li key={i}>
                {item} {(null !== longest && longest === i) ? <span className={'longest'}>longest</span> : ''}
            </li>)}
        </ul>
    </>)
}