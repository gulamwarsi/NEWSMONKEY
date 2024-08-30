// import React, { Component } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

// export class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
//   };

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0, // Make sure this is initialized
//     };
//     document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
//   }

//   setProgress = (progress) => {
//     // Here you would typically handle progress updates, like setting state or showing a progress bar
//     console.log(`Progress: ${progress}%`);
//   }

//   async updateNews() {
//     this.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });

//     try {
//       let data = await fetch(url);
//       let parseData = await data.json();
//       this.setState({
//         articles: parseData.articles,
//         totalResults: parseData.totalResults,
//         loading: false,
//       });
//       this.setProgress(100);
//     } catch (error) {
//       console.error('Failed to fetch news:', error);
//       this.setState({ loading: false });
//     }
//   }

//   async componentDidMount() {
//     this.updateNews();
//   }

//   handlePreviousClick = async () => {
//     this.setState((prevState) => ({ page: prevState.page - 1 }), this.updateNews);
//   };

//   handleNextClick = async () => {
//     const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);
//     this.setState((prevState) => ({ page: Math.min(prevState.page + 1, totalPages) }), this.updateNews);
//   };

//   fetchMoreData = async () => {
//     this.props.setProgress(10);
//     this.setState({ page: this.state.page + 1 });
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//       let data = await fetch(url);
//       this.props.setProgress(30);
//       let parseData = await data.json();
//       this.props.setProgress(70);
//       this.setState({
//         articles: this.state.articles.concat(parseData.articles),
//         totalResults: parseData.totalResults,
//         loading: false,
//       });
//       this.props.setProgress(100);
    
//   }

//   render() {
    
//     return (
//       <>
//         <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
//         {/* {this.state.loading && <Spinner />} */}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
//           // inverse={true} //
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader={<Spinner/>}
//           // scrollableTarget="scrollableDiv"
//         >
//           <div className='container'>
//             <div className='row'>
//               {this.state.articles.map((element, index) => (
//                 <div className='col-md-4' key={`${element.url}-${index}`}>
//                   {/* key={element.url}key={element.url} */}
//                   <NewsItem
//                     title={element.title}
//                     description={element.description}
//                     imageUrl={element.urlToImage}
//                     newsUrl={element.url}
//                     author={element.author}
//                     date={element.publishedAt}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className='container d-flex justify-content-between'>
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePreviousClick}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}
//           >
//             Next &rarr;
//           </button>
//         </div> */}
//       </>
//     );
//   }
// }

// export default News;

// // news.js
// import React, { useEffect, useState } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const News = (props) => {
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState([true])
//   const [page, setPage] = useState(1)
//   const [totalResults, setTotalResults] = useState(0)
//   // static defaultProps = {
//   //   country: 'in',
//   //   pageSize: 8,
//   //   category: 'general',
//   // };

//   // static propTypes = {
//   //   country: PropTypes.string,
//   //   pageSize: PropTypes.number,
//   //   category: PropTypes.string,
//   //   setProgress: PropTypes.func.isRequired, // Ensure setProgress is a required function
//   // };

//  const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     articles: [],
//   //     loading: true,
//   //     page: 1,
//   //     totalResults: 0,
//   //   };

//   //   this.updateNews = this.updateNews.bind(this);
//   //   this.handlePreviousClick = this.handlePreviousClick.bind(this);
//   //   this.handleNextClick = this.handleNextClick.bind(this);
//   //   this.fetchMoreData = this.fetchMoreData.bind(this);

//   //   document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
//   // }

//   setProgress = (progress) => {
//     props.setProgress(progress);
//   }

//   const updateNews = async () => {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${this.state.page}&pageSize=${props.pageSize}`;
//     props.setState({ loading: true });

//     try {
//       let data = await fetch(url);
//       let parseData = await data.json();
//       this.setState({
//         articles: parseData.articles,
//         totalResults: parseData.totalResults,
//         loading: false,
//       });
//       this.setProgress(100);
//     } catch (error) {
//       console.error('Failed to fetch news:', error);
//       this.setState({ loading: false });
//     }
//   }

//   useEffect(() => {
//     this.updateNews();

//   }, [])

//   // async componentDidMount() {
//   //   this.updateNews();
//   // }

// //   const handlePreviousClick = () => {
// //     this.setState((prevState) => ({ page: prevState.page - 1 }), this.updateNews);
// //   }

// //  const handleNextClick = () => {
// //     const totalPages = Math.ceil(this.state.totalResults / props.pageSize);
// //     this.setState((prevState) => ({ page: Math.min(prevState.page + 1, totalPages) }), this.updateNews);
// //   }

//   const fetchMoreData = async() => {
//     // this.setProgress(10);
//     // this.setState({ page: this.state.page + 1 });
//     // setPage(page+1)

//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${page}&pageSize=${props.pageSize}`;
//     this.setState({ loading: true });

//     try {
//       let data = await fetch(url);
//       // props.setProgress(30);
//       let parseData = await data.json();
//       // props.setProgress(70);
//       setArticles(parseData.articles)
//       setTotalResults(parseData.setTotalResults)
//       setLoading(false)
//       setArticles(articles.concat(parseData.articles))
//       setTotalResults(parseData.totalResults)

      
      
//       props.setProgress(100);
//     } catch (error) {
//       console.error('Failed to fetch news:', error);
//       props.setState({ loading: false });
//     }
//   }

  
//    return(
//     <>
//       <h1 className='text-center' style={{ margin: '35px 0px' }}>
//         NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.category)}
//       </h1>
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length !== totalResults}
//         loader={<Spinner />}
//       >
//         <div className='container'>
//           <div className='row'>
//             {articles.map((element, index) => {
//               <div className='col-md-4' key={`${element.url}-${index}`}>
//                 <NewsItem
//                   title={element.title}
//                   description={element.description}
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                   author={element.author}
//                   date={element.publishedAt}
//                 />
//               </div>
//             })}
//           </div>
//         </div>
//       </InfiniteScroll>
//     </>
//     )
  
  
// }

// News.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: 'general',
// };

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
//   setProgress: PropTypes.func.isRequired, // Ensure setProgress is a required function
// };

// export default News;






import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const { country, category, pageSize, setProgress } = props; // Destructure props
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
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=7e238be86c7a474b8c1b19f7d75ca771&page=${nextPage}&pageSize=${pageSize}`;
    
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
  }, [updateNews]); // Include updateNews in the dependency array

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px' }}>
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

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
