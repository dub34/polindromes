import React, {useMemo} from 'react'

export default ({text, palindromes = []}) => {

    //I did my best (
    const highlightedText = useMemo(() => {
        let buf = text
        palindromes.map(item => {
            buf = buf.replace(new RegExp(`(${item})`, 'gi'), `<span class='selected'>${item}</span>`)
            return item
        })
        return buf
    }, [text, palindromes])

    return <p className={'highlighted'} dangerouslySetInnerHTML={{__html: highlightedText}}/>
}