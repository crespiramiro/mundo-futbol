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
    <main className='flex flex-col min-h-screen h-screen min-w-full  bg-white text-white overflow-x-hidden'>
      
      <nav className="bg-[#2D4F39] h-auto w-full py-6 flex flex-row justify-start items-center px-10 " ><h1 className="text-5xl py-4 font-bold" >MundoPremier</h1></nav>

      <section className="z-10" >
        <div className="w-screen h-[26rem] bg-cover  bg-center " style={{backgroundImage: "url('stadium.avif')"}}  >
        </div>
        </section>

        <section className="bg-[#2D4F39] h-auto w-full py-12 text-center " >
            <p className="text-3xl py-6 text-center font-semibold " >Aca encontraras informacion sobre los ultimos partidos de tu equipo favorito en la mejor liga de todas</p>
        </section>

    <section className="bg-[#2D4f39] flex flex-col min-h-screen justify-start items-center " >

     <select className="p-2 flex w-fit font-semibold text-[#2D4f39] bg-white "
        value={team}
        onChange={(e) => handleTeamChange(e.target.value)}
      >
        <option value="" disabled>Selecciona un equipo</option>
        {data.map((teamInfo) => (
          <option key={teamInfo.idTeam} value={teamInfo.strTeam}>{teamInfo.strTeam}</option>
        ))}
      </select>

      {teamEvents.length > 0 && (
        <div className="team-events text-center bg-[#2D4f39] w-screen mb-16 px-6 py-16 text-white ">
          <h2 className="md:text-3xl" >Ultimos partidos del <b>{team}</b> como local</h2>
          <ul className="flex flex-col my-5 gap-y-2" >
            {teamEvents.map((event) => (
              <div className="text-xl flex flex-col gap-y-2 mb-3 " >
                <li className="text-white md:text-3xl " key={event.idEvent}>{event.strEvent}  -  {event.dateEvent}
              </li>
              <li className="flex flex-col justify-center items-center" ><img src={event.strThumb} alt="a" width={200} /></li>
              <li className="md:text-3xl" >{event.intHomeScore}-{event.intAwayScore} </li>
              <button onClick={() => window.open(event.strVideo, "_blank")} className="p-3 h-fit w-fit self-center rounded-lg shadow-xl bg-[#963484] text-white text-sm" >Jugadas destacadas</button>
              </div>
            ))}
          </ul>
        </div>
      )} 
    </section>

    </main>
  );
};

export default Home;
