import React from 'react'
import { Link } from 'react-router-dom'
import rest from 'js/rest'


export default class NavBar extends React.Component {
    render() {
        const nav = this.props.items
        let items = []
        if (nav) {
            items = nav.map(item => (
                <li key={item.id} className="nav-item">
                    <Link className="nav-link" to={item.url_path}>{item.title}</Link>
                </li>
            ))
        }
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
                    <Link className="navbar-brand" to="/">django-<span className="react">react</span></Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {items}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
