import React from 'react';

const NewsItem = (props) => {

  let { title, description, newsUrl, author, date } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">
            updates
          </span>
        </div>
        {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLL4GS56RxIc_QI-hiGTx14VbUZcb3u878g&s */}
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXdnM2Zud3g3b3BrdW9pM3FvNzJnODIxM2w2ZzNiMXh2M2ZyYXJ3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JmDYCOV89pmWzcpfjt/giphy.webp"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'>
            <small className='rty'>
              By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel='noreferrer'
            href={newsUrl}
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );

}



export default NewsItem