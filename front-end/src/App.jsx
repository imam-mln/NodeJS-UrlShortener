import React, { useState } from "react";
import axios from 'axios'
import './App.scss'
import './jumbotron-waves.css'

const App = () => {

  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const copy = async () => {
    const shorted = document.querySelector('#result h5')
    try {
      await navigator.clipboard.writeText(shorted.innerHTML);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const post = async () => {
    const result = document.querySelector('#result')
    const shorted = document.querySelector('#result h5')
    const long_url = document.querySelector('#input input').value

    if (!result.classList.contains('d-none')){
      result.classList.add('d-none')
    } else if (isError){
      setIsError(false)
    }

    if (await validateUrl(long_url)) {
      const res = await axios.post('http://localhost:5500/api/short', {long_url}, { "content-type": "application/json" })
      console.log(res.data)
      shorted.innerHTML = "aromx.my.id/" + res.data.id
      result.classList.remove('d-none')
    } else {
      console.log(await validateUrl(long_url))
      setIsError(true)
    }
  }

  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
  

  return (
    <div className='ocean circles'>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">rShort</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" target="_blank" href="https://github.com/imammay24/NodeJS-UrlShortener">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://github.com/imammay24/NodeJS-UrlShortener">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="jumbotron mb-5">
          <h1>rShort</h1>
          <h6 className="text-muted">Most link shortener do too much.<br/>This one just makes your links shorter.</h6>
        </div>

        <div id="input" className="container input-group">
          <input type="text" className="form-control" placeholder="Paste your link here..." aria-label="Long Url" aria-describedby="short"/>
          <button onClick={post} className="btn btn-primary text-dark" type="button" id="short">Short!</button>
        </div>

        {isError && (
          <div className="d-flex justify-content-center">
            <p id="alert" className="alert alert-danger w-50 mt-3 text-center">
              <strong>Supported link is started with https:// || http://</strong>
            </p>
          </div>
        )}

        <div id="result" className="container w-50 mt-5 d-none">
          <div className="copy-text">
            <h5 className='m-auto text-muted'>aromx.my.id/adFG89a</h5>
            <button onClick={copy} className='btn btn-primary ms-auto'><i className="bi bi-clipboard"></i></button>
          </div>
          {isCopied && (
            <p id="alert" className="alert alert-success mt-3 text-center">
              <strong>Text copied to clipboard</strong>
            </p>
          )}
        </div>

      </div>


      <ul className="no-bullets">
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
        <li className="li"></li>
      </ul>
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
    
    </div>
  );
}

export default App