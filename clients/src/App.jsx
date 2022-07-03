import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [animeName, setAnimeName] = useState('');
  const [animeReview, setAnimeReview] = useState('');
  const [animeReviewList, setAnimeReviewList] = useState([]);
  const [updatedReview, setUpdatedReview] = useState('')

  useEffect(() =>{
    Axios.get("http://localhost:3001/get").then((response)=>{
      setAnimeReviewList(response.data)
    })
  }, [])

  const submitReview = () => {
    if(animeName === '' || animeReview === ''){
      alert('Preencha os campos!')
    }else{
      Axios.post("http://localhost:3001/insert", {
        animeName : animeName,
        animeReview : animeReview
  
      }).then(async ()=>{
        return alert('Review enviado com sucesso!')
      })
      window.location.reload(true)
  }
}

  const deleteReview = (animeDel) => {
    Axios.delete(`http://localhost:3001/delete/${animeDel}`)
  }

  const upDateReview = (anime) => {
    Axios.put("http://localhost:3001/update",{
      anime: anime,
      updatedRev: updatedReview
    })
    setUpdatedReview('')
    window.location.reload(true)
  }

  return (
    <div className="App">
      <nav className='navbar'>
        <h1>CRUD - ReatJS + NodeJS + MySQL</h1>
      </nav>
      <div className='container'>
        <div className="form">
          <div className="formH1">
            <h2>Animes Review</h2>
          </div>

          <div className='animeName'>
            <input type="text" name="anime_name" id="anime_name" 
            placeholder='Nome do Anime'
             onChange={(e)=>{setAnimeName(e.target.value)}} 
             />
          </div>

          <div className='animeReview'>
            <input type="text" name="anime_review" id="anime_review" 
            placeholder='Review do Anime'
            onChange={(e)=>{setAnimeReview(e.target.value)}}
            />
          </div>

          <div className="btn-submit">
            <button>
              <input type="submit" value="Review" onClick={submitReview}/>
            </button>
          </div>

        </div>
      </div>
      {/* return <p key={review.id_anime}>Nome do Anime: {review.anime_name} | Review: {review.anime_review}</p> */}
      <div style={{color: '#fff'}}>
        {animeReviewList.map((review) => {
          return (
            
          <div className="reviewContainer" key={review.id_anime} >
            
            <h4>{review.anime_name}</h4>
            <p>{review.anime_review}</p>
            <div className="btns">
            <button onClick={() => (upDateReview(review.anime_name))}>Atualizar Review</button>
            <input type="text" name="reviewUpdate" id="reviewUpdate" placeholder='Atualizar Review' onChange={(e) =>{
              setUpdatedReview(e.target.value);
            }}/>
            <button onClick={() => {deleteReview(review.anime_name)}}>Apagar</button>
            </div>
          </div>);
        })}
      </div>
    </div>
  );
}

export default App;
