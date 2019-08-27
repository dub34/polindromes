import React, {useState, useCallback} from 'react'
import HighlightedText from './HighlightedText'
import PalindromesList from './PalindromesList'
import NotFound from './NotFound'
import FileLoader from './FileLoader'
import {findPalindromes} from "./utils"
import './App.css';

function App() {
    const [sourceText, setSourcetext] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [palindromes, setPalindromes] = useState('')

    //Use hooks just to check how does it work. Memoize handlers
    const onSourceTextChangeCallback = useCallback(
        (e) => {
            setSourcetext(e.target.value)
            // On change text we need to clear previously found palindromes
            if (palindromes) {
                setPalindromes('')
                setIsSubmitted(false)
            }
        }, [palindromes])

    const onFindBtnClickCallback = useCallback(
        _ => {
            setPalindromes(findPalindromes(sourceText))
            setIsSubmitted(true)
        }, [sourceText])

    const onClearBtnClickCallback = useCallback(
        _ => {
            setSourcetext('')
            setPalindromes('')
            setIsSubmitted(false)
        }, [])

    return (
        <div className="App">
            <section>
                <aside className={palindromes ? "block-active block-first" : "block-first"}>
                    <h2>1. Paste your text</h2>
                    <div>
                        <p>Choose file with text</p>
                        <FileLoader onLoad={setSourcetext}/>
                        <p>or paste your text into area</p>
                        <textarea onChange={onSourceTextChangeCallback} name={"sourceText"} className={"sourceText"}
                                  value={sourceText} />
                    </div>
                    <div className={'actions'}>
                        <button className={!sourceText ? "btn submit disabled" : "btn submit"}
                                onClick={onFindBtnClickCallback} type={"button"}
                                disabled={!sourceText}>Find palindromes
                        </button>
                        {sourceText && (
                            <button className={"btn cancel"} onClick={onClearBtnClickCallback} type={"button"}
                                    disabled={!sourceText}>Clear</button>
                        )}
                    </div>
                </aside>

                {(isSubmitted && sourceText) && (
                    <aside className={"block-active block-second"}>
                        {palindromes.length > 0 ? (
                            <div>
                                <h2>2. Highlighted palindromes</h2>
                                <HighlightedText text={sourceText} palindromes={palindromes}/>
                                <h2><span>3.</span> Found palindromes </h2>
                                <PalindromesList isSearchLongest={true} palindromes={palindromes}/>
                            </div>
                        ) : <NotFound/>}
                    </aside>
                )}
            </section>
        </div>
    );
}

export default App;
