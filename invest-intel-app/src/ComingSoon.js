import React from 'react';
import './ComingSoon.css'; // Import your CSS file

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="content-wrapper">
        <h1>We're coming soon!</h1>
        <p>
          We're currently working on something exciting and can't wait to share
          it with you. Sign up for our email list to be the first to know when
          we launch.
        </p>
        <form className="email-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Notify Me</button>
        </form>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default ComingSoon;
