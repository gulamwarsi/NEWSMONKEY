import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'in', category = 'general', pageSize = 8, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      const parseData = await response.json();
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setProgress(100);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  }, [country, category, page, pageSize, setProgress]);

  const fetchMoreData = async () => {
    // const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${page+1}&pageSize=${pageSize}`;
    const nextPage = page + 1;
    
    try {
      const response = await fetch(url);
      const parseData = await response.json();
      setArticles((prevArticles) => prevArticles.concat(parseData.articles));
      setTotalResults(parseData.totalResults);
      setPage(nextPage);
      setProgress(100);
    } catch (error) {
      console.error('Failed to fetch more news:', error);
    }
  };

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top Headlines from {capitalizeFirstLetter(category)}
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element, index) => (
              <div className='col-md-4' key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
