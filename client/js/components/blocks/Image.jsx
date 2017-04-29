import React from 'react'
import PropTypes from 'prop-types'

export default class Image extends React.Component {
  static propTypes = {
    alignment: PropTypes.string,
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
  }

  render() {
    const caption = this.props.caption
    const align = this.props.alignment
    const classNames = []
    if (align === 'center') {
      classNames.push('mx-auto', 'd-block')
    } else if (align === 'left') {
      classNames.push('float-left')
    } else if (align === 'right') {
      classNames.push('float-right')
    }
    if (this.props.className) {
      classNames.push(this.props.className.split(/(\s+)/))
    }
    if (caption && caption.length > 0) {
      classNames.push('figure')
      return (
        <figure className={classNames.join(' ')}>
          <img className="figure-img img-fluid" alt={this.props.alt} src={this.props.src} />
          <figcaption className="figure-caption">{caption}</figcaption>
        </figure>
      )
    } else {
      classNames.push('img-fluid')
      return (
        <img className={classNames.join(' ')} alt={this.props.alt} src={this.props.src} />
      )
    }
  }
}
