import React from 'react'
import Share from '../../components/Share/Share'
import { useParams } from 'react-router-dom';
import styles from "./SharePage.module.css";
import codesandbox from '../../assets/codesandbox.png';

export const SharePage = () => {
    const { id } = useParams();
    console.log(id)
  return (
    <>
        <div className={styles.header}>      
            <img src={codesandbox} />
            <h5>Pro Manage</h5>
        </div>

        <div className={styles.share_task_box}><Share id={id}/></div>
    </>
  )
}
