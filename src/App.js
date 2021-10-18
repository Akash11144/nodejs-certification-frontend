import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Components/card/card";
import { HashRouter, Route, Switch } from "react-router-dom";
import PlayerCard from "./Components/playerCard";
import AddPlayer from "./Components/AddPlayer";
import Footer from "./Components/footer";
import PlayerInfo from './Components/Player-Info'
import './App.css'
const App = () => {
  const [TeamData, setTeamData] = useState([])
  const [searchedPlayer, setsearchedPlayer] = useState([])
  const [searchedTeam, setsearchedTeam] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/teamget")
      .then(res => { setTeamData(res.data) })
  }, [])



  const handleSearch = async () => {
    var addToLink = document.getElementById("searchTerm").value
    if (addToLink == "") { }
    else {
      await axios.get('http://localhost:8000/playerget/' + addToLink)
        .then(res => {
          if (res.data.length == 0) {
            console.log(addToLink)
            axios.get('http://localhost:8000/playernameget/' + addToLink).then(res => { setsearchedPlayer(res.data) })
            console.log('searchedPlayer', searchedPlayer)
          }
          else {
            setsearchedTeam(res.data)
            console.log('searchedTeam', searchedTeam)
          }
        })
    document.getElementById('searchesultsCotainer').style.display='block'
      }
  }
const handleClose =()=>{
  document.getElementById('searchesultsCotainer').style.display='none'
  document.getElementById("searchTerm").value=''
}


  return (
    <HashRouter>
      <Switch>
        <Route path='/playerCard' component={PlayerCard}></Route>
        <Route path='/AddPlayer' component={AddPlayer}></Route>
        <Route path='/playerInfo' component={PlayerInfo}></Route>
        <div className='main'>
          <div className='topbar'>
            <h2 style={{color:"goldenrod",fontSize:"2rem"}}>Welcome To My App</h2>
            <div id='searchHolder'>
            <input type={Text} id='searchTerm' onChange={(e) => handleSearch()} placeholder='Team/Player'></input>
            <button id='searchbutton' onClick={() => handleSearch()}>Search</button>
          </div>
          </div>
          <div id='searchesultsCotainer'>
          <button id='closeButton' onClick={() => handleClose()}>X</button>
            {searchedTeam.length ? searchedTeam.map(item => <SearPlayer {...item}></SearPlayer>) : ""}
            {searchedPlayer.length ? searchedPlayer.map(item => <SearPlayer {...item}></SearPlayer>) : ""}
          </div>
          <div className='cardContainerTeam'> 
            {TeamData.length && TeamData.map(item => <Card {...item}></Card>)}
          </div>
        </div>
      </Switch>
    </HashRouter>);
}

export default App;

const SearPlayer = ({ name }) => {
  return (<div id='searchesults' >
    {name}
  </div>);
}
