import { useLocation } from 'react-router-dom';
import cookie from 'js-cookie';

function AdminAuthentication(props) {
  const location = useLocation();
  const { pathname } = location;
  const { history } = props;

  if (cookie.get('token') && (pathname === '/' || pathname === '/login')) {
    history.replace('/admin/overview');
    return '';
  }

  if (!cookie.get('token') && !(pathname === '/login' ) && !(pathname === '/forgot-password')) {
    history.replace('/login');
    return '';
  }

  return props.children;
}

export default AdminAuthentication;
