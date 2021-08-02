import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Headers from "./Header";
import './App.css';

import axios from 'axios';

function App() {

  //react custom hook
  const {register, handleSubmit, formState: { errors }} = useForm();
  const [showResults, setShowResults] = useState('false');
  const [shortUrl, setShortUrl] = useState('');

  //post url to backend api
  const onSubmit = (data) => {
    console.log(data)
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/short',
      data: {
        url: data.url
      }
    })
      .then((res) => {
        setShowResults(true);
        setShortUrl(res.data.short_url);
      }).catch(error => {
        console.log("error: ", error);
      })

  };

  return (
    <div>
      <form action= "/api" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Headers />
        <input type="text" placeholder="http://www.google.com/" name="url" {...register('url', { required: true })}/>
        {errors.url && <p> This is a required field</p>}
        <input type="submit"/>
      </form>

     {showResults ? <Results state = {{ setURL : [shortUrl, setShortUrl] }} /> : null}
    </div>
  );
}

function Results(props) {
  // need to up lift usestate in this component to update it from parent
  const { setURL : [shortUrl, setShortUrl] } = { setURL : useState(''), ...(props.state || {})};

  return (
    <div className="output">
      {shortUrl}
    </div>
  );
}

export default App;
