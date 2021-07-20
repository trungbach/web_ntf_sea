import React,{useEffect, useState} from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link } from 'umi';
import styles from './styles.scss';
import BUS from '../../assets/buslogo1.png'


function PageHeader(props) {
  const { location } = props;
  const [page, setPage] = useState(location.pathname)
  const adminMenu = [
    {
      page: 'overview',
      icon: <Icon type="home" />,
      url: '/admin/overview',
      text: 'Tổng quan',
    },
  ];


  useEffect(() => {
    setPage(location.pathname)
  }, [location.pathname])

  return (
    <div className={styles.headerMenu}>
      <div className={styles.contentMenu}>
        <div className={styles.logo_menu}>
          <img src={BUS} alt="logo"/>
          <span className={styles.title}>SCHOOL BUS</span>
        </div>
        <div className={styles.menuHeader}>
          <Menu theme="dark">
            {adminMenu.map(menu => (
              <Menu.Item
                key={menu.url}
                className={`${page === menu.url ? styles.activeAdmin : ''} menuItem`}
              >
                <Link to={menu.url}>
                  {menu.icon}
                  <span className={styles.span}>{menu.text}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
}

// export default withRouter(PageHeader);
export default withRouter(PageHeader )
