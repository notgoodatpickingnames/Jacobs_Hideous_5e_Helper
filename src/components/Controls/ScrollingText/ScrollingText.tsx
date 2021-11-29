import { useEffect, useRef, useState } from 'react';

import useInterval from '../../../Utils/hooks/useInterval';

interface ScrollingTextProps {
    text: string[];
    timeBetweenLetters: number;
}

export function ScrollingText({text, timeBetweenLetters}: ScrollingTextProps) {
    const [visibleText, setVisibleText] = useState<string[]>([]);
    const [running, setRunning] = useState<boolean>(false);
    const totalTextCount = useRef<number>();
    const lineNumber = useRef<number>(0);

    useEffect(() => {
        let totalCount = 0;

        text.forEach((t) => {
            totalCount += t.length;
        });

        totalTextCount.current = totalCount;
        
        setRunning(true);
    }, [text]);

    useInterval(() => {
        if (Boolean(text) && !(lineNumber.current > text.length - 1)) {
            if (!Boolean(visibleText[lineNumber.current]) || visibleText[lineNumber.current].length !== text[lineNumber.current].length) {
                const newVisibleText = [...visibleText];

                const oldLine = Boolean(newVisibleText[lineNumber.current]) ? newVisibleText[lineNumber.current] : '';
                const newLine = oldLine + text[lineNumber.current][oldLine.length];

                newVisibleText[lineNumber.current] = newLine;

                setVisibleText(newVisibleText);
            } else {
                lineNumber.current++;
            }
        } else {
            setRunning(false);
        }
    }, running ? timeBetweenLetters : undefined);
    
    return (
        <>
            {
                visibleText.map((vt, index) => 
                    <span key={`scrolling_text_${index}`}>{vt} <br /></span>
                )
            }
        </>
    );
}