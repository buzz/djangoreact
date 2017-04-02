import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'


const PageLink = ({className, isActive, ...rest}) => (
    <Link
        className={isActive ? [ 'active', className ].join(' ') : className}
        {...rest}
    />
)

export default class NavBar extends React.Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        pages: PropTypes.object.isRequired,
        pageTree: PropTypes.object.isRequired,
    }

    render() {
        const root = this.props.pageTree
        const path = this.props.path
        const isActive = pagePath => path === pagePath

        const topLevelNav = root.children.map(page => {

            const dropdownItems = page.children.map(p => (
                <PageLink className="dropdown-item"
                          key={p.id}
                          isActive={isActive(p.meta.url_path)}
                          to={p.meta.url_path}>
                    {p.title}
                </PageLink>
            ))

            // normal nav link
            if (dropdownItems.length === 0) {
                return (
                    <li key={page.id} className="nav-item">
                        <PageLink className="nav-link"
                                  isActive={isActive(page.meta.url_path)}
                                  to={page.meta.url_path}>
                            {page.title}
                        </PageLink>
                    </li>
                )
            }

            // dropdown menu
            else {
                return (
                    <li key={page.id} className="nav-item dropdown">
                        <PageLink className="nav-link dropdown-toggle"
                                  to={page.meta.url_path}
                                  isActive={isActive(page.meta.url_path)}
                                  aria-haspopup="true"
                                  aria-expanded="false">
                            {page.title}
                        </PageLink>
                        <div className="dropdown-menu">
                            {dropdownItems}
                        </div>
                    </li>
                )
            }
        })

        return (
            <nav className="navbar sticky-top navbar-toggleable-sm
                            navbar-inverse bg-inverse">
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
                    <PageLink className="navbar-brand"
                              isActive={isActive(root.meta.url_path)}
                              to={root.meta.url_path}
                              title={root.title}>
                        wagtail-<span className="react">react</span>
                    </PageLink>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="navbar-nav mr-auto">
                            {topLevelNav}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
