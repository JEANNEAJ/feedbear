import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

/** Formats and displays the markdown string provided as child prop */
export default function MarkdownDisplayComponent(props) {
  const [message, setMessage] = useState(props.children);
  const [shortMessage, setShortMessage] = useState('');
  const [withinMaxLength, setWithinMaxLength] = useState(true); 
  const [buttonText, setButtonText] = useState('Show More');

  /** Max length of message before being cut off (number of lines) */
  const shortMessageLength = 10;

  // if message is long enough, split off shorter message to display by default
  useEffect(() => {
    const messageArray = message.split('\n');

    if (messageArray.length > shortMessageLength) {
      setWithinMaxLength(false);
      setShortMessage(messageArray.slice(0, shortMessageLength).join('\n'));
    } else {
      setWithinMaxLength(true);
    }
  }, [message]);

  // Toggle button message when message length display is changed
  useEffect(() => {
    setButtonText(withinMaxLength ?'Hide' : 'Show More');
  }, [withinMaxLength]);

  /** Toggle showing full comment */
  const toggleShowMore = () => {
    setWithinMaxLength(!withinMaxLength);
  }

  return (
    <div className="markdown">
      <ReactMarkdown plugins={[gfm]}>{withinMaxLength ? message : shortMessage}</ReactMarkdown>
      {shortMessage && 
        <button className="text-sm text-blue-500 font-bold" onClick={toggleShowMore} type="button">{buttonText}</button>
      }
    </div>
  )
}