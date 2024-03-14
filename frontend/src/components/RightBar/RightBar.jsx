import React, { useState } from 'react';
import codesandbox from '../../assets/codesandbox.png';
import database from '../../assets/database.svg';
import layout from '../../assets/layout.png';
import settings from '../../assets/settings.svg';
import database1 from '../../assets/database.png';
import layout1 from '../../assets/layout.svg';
import settings1 from '../../assets/settings.png';
import logout from '../../assets/Logout.png';
import { useNavigate } from 'react-router-dom';
import styles from "./RightBar.module.css";

export const RightBar = ({ selected }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);
  let navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option == "board") navigate(`/`)
    else navigate(`/${option}`);
  };
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Use navigate to go to '/login'
    navigate('/login');
  };


  // The function to call when the Logout div is clicked
  const handleLogoutClick = () => {
    setConfirmLogout(true);
  };

  // The function to call when the user confirms the logout
  const handleConfirmLogout = () => {
    handleLogout();
    setConfirmLogout(false);
  };

  // The function to call when the user cancels the logout
  const handleCancelLogout = () => {
    setConfirmLogout(false);
  };
  return (
    <>
      {confirmLogout && <div className={styles.darkOverlay} />}
      <div className={styles.right_up}>
        <img src={codesandbox} />
        <h5>Pro Manage</h5>
      </div>

      <div className={styles.options_master}>
        <div
          className={`${styles.options} ${selectedOption === 'board' ? styles.selected : ''}`}
          onClick={() => handleOptionClick('board')}
        >
          <img src={selectedOption === 'board' ? layout : layout1}  />
          <h5>Board</h5>
        </div>
        <div
          className={`${styles.options} ${selectedOption === 'analytics' ? styles.selected : ''}`}
          onClick={() => handleOptionClick('analytics')}
        >
          <img src={selectedOption === 'analytics' ? database : database1} />
          <h5>Analytics</h5>
        </div>

        <div
          className={`${styles.options} ${selectedOption === 'settings' ? styles.selected : ''}`}
          onClick={() => handleOptionClick('settings')}
        >
          <img src={selectedOption === 'analytics' ? settings1 : settings} className={selectedOption === 'analytics' ? 'selectedImage' : ''} />
          <h5>Setting</h5>
        </div>
      </div>
      <div>
        <div className={styles.logout} onClick={handleLogoutClick}>
          <img src={logout} />
          <h5>Log out</h5>
        </div>
      </div>


      {confirmLogout && (
        <div className={styles.modal}>
          <p>Are you sure you want to logout?</p>
          <button className={styles.modal_button_yes} onClick={handleConfirmLogout}>Yes, Logout</button>
          <button className={styles.modal_button_no} onClick={handleCancelLogout}>No</button>
        </div>
      )}
    </>
  );
};
