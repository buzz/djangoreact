import React from 'react'


export default class NavBar extends React.Component {
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
                    <a className="navbar-brand" href="/">django-react</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/nice-about-page/">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
