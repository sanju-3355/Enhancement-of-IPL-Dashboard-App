import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import PieChart from '../PieChart'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getMatchesDetails()
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  getFormatingData = value => ({
    id: value.id,
    competingTeam: value.competing_team,
    date: value.date,
    venue: value.venue,
    result: value.result,
    competingTeamLogo: value.competing_team_logo,
    firstInnings: value.first_innings,
    secondInnings: value.second_innings,
    manOfTheMatch: value.man_of_the_match,
    matchStatus: value.match_status,
    umpires: value.umpires,
  })

  getMatchesDetails = async () => {
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    // console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)

    const formatingData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getFormatingData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormatingData(eachMatch),
      ),
    }
    this.setState({teamMatchesData: formatingData, isLoading: false})
  }

  getNoOfMatches = value => {
    const {teamMatchesData} = this.state
    const {latestMatch, recentMatches} = teamMatchesData
    const currentMatch = value === latestMatch.matchStatus ? 1 : 0
    const result =
      recentMatches.filter(each => each.matchStatus === value).length +
      currentMatch
    return result
  }

  generatePieChartData = () => [
    {name: 'Won', value: this.getNoOfMatches('Won')},
    {name: 'Lost', value: this.getNoOfMatches('Lost')},
    {name: 'Drawn', value: this.getNoOfMatches('Drawn')},
  ]

  renderMatchCardDetails = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData
    return (
      <ul className="match-card-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchCard={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatch} = teamMatchesData
    return (
      <div className="matches-data-container">
        <img src={teamBannerUrl} alt="team banner" className="banner-img" />
        <LatestMatch latestDetails={latestMatch} />
        <h1 className="heading">Team Statistics</h1>
        <PieChart data={this.generatePieChartData()} />
        {this.renderMatchCardDetails()}
        <button className="back-btn" type="button" onClick={this.onClickBack}>
          Back
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
