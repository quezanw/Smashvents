import React from 'react';
import styles from './MarkdownPane.module.scss';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

const MarkdownPane = props => {
  const style = {
    width: props.width,
    height: props.height,
    padding: props.padding
  }
  return (
    <div style={style} className={`${styles.markdownPane} markdown-body`}>
      <ReactMarkdown 
        source={props.md}
      />
    </div>    
  )
}

export default MarkdownPane;