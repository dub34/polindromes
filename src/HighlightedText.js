import React, {useMemo} from 'react'

export default ({text, palindromes = []}) => {

    //I did my best (
    const highlightedText = useMemo(() => {
        let buf = text
        palindromes.map(item => {
            //useless. In this case simple substring replace is enough
            // buf = buf.replace(new RegExp(`(${item})`, 'gi'), `<span class='selected'>${item}</span>`)
            buf = buf.replace(item, `<span class='selected'>${item}</span>`)
            return item
        })
        return buf
    }, [text, palindromes])

    return <p className={'highlighted-text'} dangerouslySetInnerHTML={{__html: highlightedText}}/>
}