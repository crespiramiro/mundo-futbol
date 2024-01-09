
    export default function Table({selectedTeamRow, setSelectedTeamRow, tableData}) {
  return (
    <div className="table-container min-h-screen h-screen w-full px-4 md:px-24 pb-12 overflow-x-auto overflow-y-visible ">
    <table className="table min-w-full">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((team, index) => (
           <tr
           key={team.idTeam}
           className={team.strTeam === selectedTeamRow ? 'text-black text-center bg-white' : 'text-center'}
           onClick={() => setSelectedTeamRow(team.strTeam)} 
         >
              <td className="text-center">{team.intRank}</td>
              <td className="text-center">
                <img src={team.strTeamBadge} alt={`${team.strTeam} badge`} className="team-badge" />
                {team.strTeam}
              </td>
              <td>{team.intPlayed}</td>
              <td>{team.intWin}</td>
              <td>{team.intDraw}</td>
              <td>{team.intLoss}</td>
              <td>{team.intGoalsFor}</td>
              <td>{team.intGoalsAgainst}</td>
              <td>{team.intGoalDifference}</td>
              <td>{team.intPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};


