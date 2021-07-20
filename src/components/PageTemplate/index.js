import React from 'react';
import '@/base.scss';
import styles from './styles.scss';
function PageTemplate(props) {
  const { content } = props;

  return (
    <div className={styles.contentPage}>
      {content}
    </div>
  );
}

export default PageTemplate;
