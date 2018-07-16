import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import hljs from 'highlight.js';
import Tooltip from './Tooltip';
import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';
import marked from 'marked';

class MarkdownEditor extends Component {
  componentDidMount() {
    window.hljs = hljs; // Required for Code Highlighting in Preview
    marked.setOptions({
      // Required for custom highlighting language
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, code, true).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      },
      gfm: true,
      langPrefix: 'hljs ', //Required for custom highlighting css
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  render() {
    const { onChange, onSave, initialValue } = this.props;

    let opts = Object.create(this.props);

    opts['autoDownloadFontAwesome'] = false;
    opts['spellChecker'] = true;
    opts['renderingConfig'] = {
      codeSyntaxHighlighting: false, // Required for custom highlighting language
    };
    let toolbarIcons = [
      'bold',
      'italic',
      'heading-1',
      'heading-2',
      'heading-3',
      '|',
      'code',
      'quote',
      'unordered-list',
      'ordered-list',
      'table',
      '|',
      'link',
      'image',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
      'guide',
    ];
    opts['toolbar'] = toolbarIcons;

    const tooltipText = (
      <span>
        Write your <b>body content</b> in markdown and preview it's rendered
        form here. Press the <b>?</b> symbol in the editor for a quick guide to
        markdown syntax. The editor contains quick buttons for common markdown
        syntax, a <b>full screen mode</b> and a <b>split screen editor</b> that
        displays both the editor and a preview at the same time.
      </span>
    );

    return (
      <div className="body-content">
        <label>
          Body Content
          <Tooltip content={tooltipText} />
        </label>
        <SimpleMDE
          id="editor"
          onChange={onChange}
          value={initialValue}
          options={opts}
        />
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor;
