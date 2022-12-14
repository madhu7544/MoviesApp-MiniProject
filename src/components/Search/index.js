import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import FailureView from '../FailureView'
import Loading from '../Loading'
import MovieDetailsLink from '../MovieDetailsLink'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    moviesSearchList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMoviesFromSearch()
  }

  getMoviesFromSearch = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
      }))
      this.setState({
        moviesSearchList: updatedData,
        apiStatus: apiStatusConstants.success,
        searchInput,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSearchInput = movieName => {
    this.setState(
      {
        searchInput: movieName,
      },
      this.getMoviesFromSearch,
    )
  }

  noResultView = () => {
    const {searchInput} = this.state
    return (
      <div className="no-result-container">
        <img
          src="https://res.cloudinary.com/dsiyffj0o/image/upload/v1670926590/Group_7394_ejwfo3.png"
          className="no-results"
          alt="no movies"
        />
        <p className="no-results-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {moviesSearchList} = this.state

    return moviesSearchList.length > 0 ? (
      <ul className="search-list">
        {moviesSearchList.map(eachMovie => (
          <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    ) : (
      this.noResultView()
    )
  }

  onClickRetry = () => {
    this.getMoviesFromSearch()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  renderSearchPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="search-bg-container">
          <Header getSearchInput={this.getSearchInput} />
          <div className="search-container">{this.renderSearchPage()}</div>
        </div>
      </>
    )
  }
}

export default Search
