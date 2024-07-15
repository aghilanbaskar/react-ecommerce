import React from 'react';
import shopMen from 'src/assets/shopMen.jpg';
import shopWomen from 'src/assets/shopWomen.jpg';
import 'src/scss/components/directory.scss';
const Directory = () => {
  return (
    <div className="directory">
      <div style={{ backgroundImage: `url(${shopMen})` }} className="item">
        <a href="#">Shop Men</a>
      </div>
      <div style={{ backgroundImage: `url(${shopWomen})` }} className="item">
        <a href="#">Shop Women</a>
      </div>
    </div>
  );
};

export default Directory;
