import React, { Component, PropTypes } from 'react'
import marked from '../util/marked'

export default class Method extends Component {

  static contextTypes = {
    section: PropTypes.string.isRequired,
  };

  static propTypes = {
    example: PropTypes.string,
    children: PropTypes.array,
    description: PropTypes.string,
    method: PropTypes.string.isRequired,
    id: PropTypes.string
  };

  render() {
    const {
      context: {section},
      props: {method, example, children, description, id}
    } = this

    let methodContent = []

    if (description) {
      methodContent.push(
        <p key="description" dangerouslySetInnerHTML={{__html: marked(description)}} />
      )
    }

    if (children && children.length > 0) {
      methodContent = methodContent.concat(children)
    }

    return (
      <div id={id ? id : `${section}-${method}`}>
        <b>{method}</b>
        {example && ` — `}
        {example && <code>{example}</code>}
        {methodContent}
      </div>
    )
  }
}
