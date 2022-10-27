import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { BookSection } from 'Shared/Types/Book';

import styles from './index.module.css';

const BookDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  if (!location.state) navigate('/books');

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img alt={location.state.title} src={location.state.cover_url} />
        <p>
          Authors: <b>{location.state.authors.join(', ')}</b>
        </p>
        <p>
          Audio Length: <b>{location.state.audio_length} minutes</b>
        </p>
      </div>
      <div className={styles.rightContainer}>
        <h1>{location.state.title}</h1>
        <br />
        <p>{location.state.description}</p>
        <br />
        <table className={styles.sectionTable}>
          <thead>
            <tr>
              <th>Section</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {location.state.sections &&
              location.state.sections.map((section: BookSection, idx: number) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{section.title}</td>
                  <td className={styles.contentCell}>{section.content}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookDetail;
