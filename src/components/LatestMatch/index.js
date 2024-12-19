import './index.css'

const LatestMatch = props => {
  const {latestDetails} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestDetails

  return (
    <>
      <h1 className="heading">Latest Match Details</h1>
      <div className="latest-match-container">
        <div className="match-logo-details-container">
          <div className="match-details">
            <p className="team-name">{competingTeam}</p>
            <p className="date">{date}</p>
            <p className="venue-details">{venue}</p>
            <p className="result-details">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="team-logo"
          />
        </div>
        <hr className="separator" />
        <div className="match-details-2">
          <p className="match-details-label">First Innings</p>
          <p className="match-details-value">{firstInnings}</p>
          <p className="match-details-label">Second Innings</p>
          <p className="match-details-value">{secondInnings}</p>
          <p className="match-details-label">Man Of The Match</p>
          <p className="match-details-value">{manOfTheMatch}</p>
          <p className="match-details-label">Umpires</p>
          <p className="match-details-value">{umpires}</p>
        </div>
      </div>
    </>
  )
}
export default LatestMatch
