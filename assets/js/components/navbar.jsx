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
    }

    render() {
        let items = []
        let root = { meta: { url_path: '/' } }
        const path = this.props.path
        const isActive = pagePath => path === pagePath
        if (this.props.pages.sync) {
            // build menu tree from flat array
            const pages = this.props.pages.data.items
            root = pages.find(p => p.meta.parent === null)
            const rootChildren = pages.filter(p => p.meta.parent === root.id)
            items = rootChildren.map(page => {
                const children = pages
                    .filter(p => p.meta.parent === page.id)
                    .map((p) => (
                        <PageLink key={p.id}
                                  isActive={isActive(p.meta.url_path)}
                                  className="dropdown-item"
                                  to={p.meta.url_path}>
                            {p.title}
                        </PageLink>
                    ))
                if (children.length > 0) {
                    return (
                        <li key={page.id} className="nav-item dropdown">
                            <PageLink className="nav-link"
                                      isActive={isActive(page.meta.url_path)}
                                      to={page.meta.url_path}>
                                {page.title}
                            </PageLink>
                            <a className="nav-link dropdown-toggle"
                               data-toggle="dropdown"
                               to="#"
                               role="button"
                               aria-haspopup="true"
                               aria-expanded="false"/>
                            <div className="dropdown-menu">
                                {children}
                            </div>
                        </li>
                    )
                }
                else {
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
            })
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
                    <PageLink className="navbar-brand"
                              isActive={isActive(root.meta.url_path)}
                              to={root.meta.url_path}
                              title={root.title}>
                        wagtail-<span className="react">react</span>
                    </PageLink>
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
