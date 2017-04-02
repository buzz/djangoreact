import React from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'


export class FadeSwapper extends React.Component {
    state = { swapped: false }

    componentDidMount() {
        console.log('DID MOUNT')
    }

    onClick = () => {
        this.setState({ swapped: !this.state.swapped })
    }

    render() {
        const children = React.Children.toArray(this.props.children)
        return (
            <ReactCSSTransitionReplace onClick={this.handleClick}
                                       {...this.props}>

            </ReactCSSTransitionReplace>
        )
    }
}
