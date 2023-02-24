import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [liberalArticles, setLiberalArticles] = useState([]);
  const [conservativeArticles, setConservativeArticles] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const liberalResponse = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&sources=bbc-news,cnn,msnbc,the-guardian&apiKey=f1ca731270014decb9fa26b59c5fd48f`
      );
      
      const liberalData = await liberalResponse.json();
      const liberalArticles = liberalData.articles.slice(0, 3);
      setLiberalArticles(liberalArticles);

      const conservativeResponse = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&sources=fox-news,breitbart-news,newsmax,the-washington-times&apiKey=f1ca731270014decb9fa26b59c5fd48f`
      );
      const conservativeData = await conservativeResponse.json();
      const conservativeArticles = conservativeData.articles.slice(0, 3);
      setConservativeArticles(conservativeArticles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <title>BothNews</title>
      <link rel="stylesheet" type="text/css" href="./App.css" />
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <div className="check">
        {liberalArticles.length > 0 && conservativeArticles.length > 0 && (
          <div className="article-container">
            <div className="right-column">
              <h2>Liberal Articles</h2>
              {liberalArticles.map((article, index) => (
                <div key={`liberal-${index}`} className="liberal-article">
                  <p>
                    <span className="source">{article.source.name} - </span>
                    <span className="date">
                      {new Date(article.publishedAt).toLocaleDateString()} -{" "}
                    </span>
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <a href={article.url} target="_blank" rel="noreferrer">
                    Read more
                  </a>
                </div>
              ))}
            </div>

            <div className="left-column">
              <h2>Conservative Articles</h2>
              {conservativeArticles.map((article, index) => (
                <div
                  key={`conservative-${index}`}
                  className="conservative-article"
                >
                  <p>
                    <span className="source">{article.source.name} - </span>
                    <span className="date">
                      {new Date(article.publishedAt).toLocaleDateString()}{" "}
                    </span>
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <a href={article.url} target="_blank" rel="noreferrer">
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
  );
};

export default App;