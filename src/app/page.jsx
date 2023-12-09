 'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const initialData = [];
  const [data, setData] = useState(initialData);
  const [team, setTeam] = useState('');
  const [teamEvents, setTeamEvents] = useState([]);

  const handleTeamChange = async (selectedTeam) => {
    setTeam(selectedTeam);
    localStorage.setItem('selectedTeam', selectedTeam);
    setTeamEvents([]);

    try {
      const selectedTeamInfo = data.find((teamInfo) => teamInfo.strTeam === selectedTeam);

      if (selectedTeamInfo) {
        const teamId = selectedTeamInfo.idTeam || selectedTeamInfo.idTeamAPI;
        const eventsUrl = `https://thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`;
        const response = await axios.get(eventsUrl);
        const eventsData = response.data.results;
        setTeamEvents(eventsData);
      } else {
        console.error('No se encontró información para el equipo seleccionado');
      }
    } catch (error) {
      console.error('Error fetching team events:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League";
        const res = await axios.get(url);
        const newData = res.data.teams;
        setData(newData);

        const storedTeam = localStorage.getItem('selectedTeam');
        if (storedTeam) {
          const teamExists = newData.some((teamInfo) => teamInfo.strTeam === storedTeam);

          if (teamExists) {
            // handleTeamChange(storedTeam); // Comentado temporalmente
          } else {
            localStorage.removeItem('selectedTeam');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llamada a fetchData en el montaje inicial
  }, []); // Efecto se ejecuta solo en el montaje inicial

  return (
    <main className='flex flex-col gap-y-4 min-h-screen min-w-full justify-center items-center bg-[#EBCFB2]'>
      <h1 className="text-5xl py-4 font-bold text-[#5C573E] " >Bienvenido a Mundo Futbol</h1>

      <select className="p-1 bg-[#D87CAC] "
        value={team}
        onChange={(e) => handleTeamChange(e.target.value)}
      >
        <option value="" disabled>Selecciona un equipo</option>
        {data.map((teamInfo) => (
          <option key={teamInfo.idTeam} value={teamInfo.strTeam}>{teamInfo.strTeam}</option>
        ))}
      </select>

      {teamEvents.length > 0 && (
        <div className="team-events text-center bg-[#5C573E] w-[85%] mb-16 py-16 text-white ">
          <h2 className="text-3xl" >Ultimos partidos del <b>{team}</b> como local</h2>
          <ul className="flex flex-col my-5 gap-y-2" >
            {teamEvents.map((event) => (
              <div className="text-xl flex flex-col gap-y-2 mb-3 " >
                <li className="text-white text-3xl " key={event.idEvent}>{event.strEvent}  -  {event.dateEvent}
              </li>
              <li className="flex flex-col justify-center items-center" ><img src={event.strThumb} alt="a" width={200} /></li>
              <li className="text-3xl" >{event.intHomeScore}-{event.intAwayScore} </li>
              <button onClick={() => window.open(event.strVideo, "_blank")} className="p-3 h-fit w-fit self-center rounded-lg shadow-xl bg-[#D87CAC] text-white text-sm" >Jugadas destacadas</button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Home;
