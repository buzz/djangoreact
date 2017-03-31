import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import rest from 'js/rest'


class NavBar extends React.Component {
    componentDidMount() {
        // this.props.dispatch(rest.actions.nav.sync())
    }

    render() {
        return (
            <nav className="navbar sticky-top navbar-toggleable-sm navbar-inverse bg-inverse">
                <div className="container">
                    <button className="navbar-toggler navbar-toggler-right"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">django-react</NavLink>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/nice-about-page/">About</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const select = s => { return { nav: s.nav } }
export default connect(select)(NavBar)
