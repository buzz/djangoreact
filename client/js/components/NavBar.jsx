import React from 'react'
import PropTypes from 'prop-types'

import PageLink from 'js/components/PageLink'

export default class NavBar extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    pageTree: PropTypes.object.isRequired,
  }

  render() {
    const root = this.props.pageTree
    const path = this.props.path
    const isActive = page => path === page.meta.url_path

    const homeLink = root.meta.show_in_menus ? (
      <PageLink className="navbar-brand"
                isActive={isActive(root)}
                to={root.meta.url_path}
                title={root.title}>
        wagtail-react
      </PageLink>
    ) : false

    const topLevelNav = root.meta.show_in_menus ? (
      root.children.filter(page => page.meta.show_in_menus).map(page => {
        const dropdownItems = page.children.filter(page => page.meta.show_in_menus).map(p => (
          <PageLink className="dropdown-item"
                    key={p.id}
                    isActive={isActive(p)}
                    to={p.meta.url_path}>
            {p.title}
          </PageLink>
        ))

        if (dropdownItems.length === 0) {
          // normal nav link
          return (
            <li key={page.id} className="nav-item">
              <PageLink className="nav-link"
                        isActive={isActive(page)}
                        to={page.meta.url_path}>
                {page.title}
              </PageLink>
            </li>
          )
        } else {
          // dropdown menu
          return (
            <li key={page.id} className="nav-item dropdown">
              <PageLink className="nav-link dropdown-toggle"
                        to={page.meta.url_path}
                        isActive={isActive(page)}
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
    ) : false

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
          {homeLink}
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
