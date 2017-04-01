import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import rest from 'js/rest'


export default class NavBar extends React.Component {
    static propTypes = {
        pages: PropTypes.object.isRequired,
    }

    render() {
        // TODO: build a proper tree-like nav from pages
        let items = []
        if (this.props.pages.sync) {
            items = this.props.pages.data.items.map(item => (
                <li key={item.id} className="nav-item">
                    <Link className="nav-link" to={item.meta.url_path}>{item.title}</Link>
                </li>
            ))
        }
        return (
            <nav className="navbar sticky-top navbar-toggleable-sm navbar-inverse bg-inverse">
                <div className="container">
                    <button className="navbar-toggler navbar-toggler-right"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbar-menu"
                            aria-controls="navbar-menu"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">
                        wagtail-<span className="react">react</span>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="navbar-nav mr-auto">
                            {items}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
