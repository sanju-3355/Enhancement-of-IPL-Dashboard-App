import './index.css'

const MatchCard = props => {
  const {matchCard} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = matchCard
  const getStatus = status => (status === 'Won' ? `match-won` : `match-loss`)
  const matchStatusClassName = `match-status ${getStatus(matchStatus)}`

  return (
    <li className="match-card-list-items">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="card-logo"
      />
      <p className="name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
