import React, {useState, useCallback} from 'react'
import HighlightedText from './HighlightedText'
import PalindromesList from './PalindromesList'
import NotFound from './NotFound'
import FileLoader from './FileLoader'
import './App.css';

function App() {
    const [sourceText, setSourcetext] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [palindromes, setPalindromes] = useState('')

    const onSourceTextChangeCallback = useCallback(
        (e) => {
            setSourcetext(e.target.value)
            if (palindromes) {
                setPalindromes('')
                setIsSubmitted(false)
            }
        }, [palindromes])

    const onFindBtnClickCallback = useCallback(
        _ => {
            const p = ['dod']

            setPalindromes(p)
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
                <article className={palindromes ? "block-active block-first" : "block-first"}>
                    <h2>Palindrome finder</h2>
                    <div>
                        <p>Choose file with text</p>
                        <FileLoader onLoad={setSourcetext}/>
                        <p>or put your text into area
                        <textarea onChange={onSourceTextChangeCallback} name={"sourceText"} className={"sourceText"}
                                  value={sourceText}/>
                        </p>
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
                </article>

                {(isSubmitted && sourceText) && (
                    <article className={"block-active block-second"}>
                        {palindromes.length > 0 ? (
                            <div>
                                <h2>Highlight</h2>
                                <HighlightedText text={sourceText} palindromes={palindromes}/>
                                <PalindromesList isSearchLongest={true} palindromes={palindromes}/>
                            </div>
                        ) : <NotFound/>}
                    </article>
                )}
            </section>
        </div>
    );
}

export default App;
