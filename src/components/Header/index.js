import {Component} from 'react'

import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {showMenu: false, showSearchBar: false}

  onClickViewSearch = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickViewMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onChangeSearchInput = event => {
    const {getSearchInput} = this.props
    if (event.key === 'Enter') {
      getSearchInput(event.target.value)
    }
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    return (
      <nav className="nav-container-element">
        <div className="header-elements-container">
          <ul className="header-list-items">
            <Link to="/">
              <li>
                <img
                  src="https://res.cloudinary.com/dsiyffj0o/image/upload/v1670493842/Group_7399_f2jz6k.png"
                  alt="website logo"
                  className="website-logo"
                />
              </li>
            </Link>
            <Link to="/" className="comp-link">
              <li className="item-heading">Home</li>
            </Link>
            <Link to="/popular" className="comp-link">
              <li className="item-heading">Popular</li>
            </Link>
          </ul>
          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                onKeyDown={this.onChangeSearchInput}
                placeholder="search"
                className="search"
                testid="searchButton"
              />
            )}
            <Link to="/search">
              <button type="button" className="search-btn">
                <HiOutlineSearch
                  size={20}
                  color="white"
                  className="search-icon"
                  onClick={this.onClickViewSearch}
                />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1663047636/Avatar_dhntyp.png"
                alt="profile"
                className="avatar-img"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickViewMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="screen-list">
              <Link to="/" className="comp-link">
                <li className="item-heading">Home</li>
              </Link>
              <Link to="/popular" className="comp-link">
                <li className="item-heading">Popular</li>
              </Link>
              <Link to="/account" className="comp-link">
                <li className="item-heading">Account</li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickViewMenu}
                className="cross-icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
