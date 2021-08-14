import superagent from 'superagent';
import Cookies from 'js-cookie';
import config from '@/config/index';
import Router from 'next/router'
const request = {
  get: (url, data = {}) => 
    superagent
      .get(config.API_DOMAIN + url)                                              
      .query(data)
      .set('Accept', 'application/json')    
      .use((req) =>                                      
        req.on('error', (err) => {
          if (err.status === 401) {
            Cookies.remove('token');
            Router.push({ pathname: '/' });
          }
        }))
      ,

  getWithAccessToken: (url, data = {}, token) => 
    superagent
      .get(config.API_DOMAIN + url)                                              
      .query(data)
      .set('Accept', 'application/json')    
      .set('x-access-token', token)
      // .catch(err => {
      //   if(err.status === 401) {
      //   }
      // }),
      .use((req, res) =>                                      
        req.on('error', (err) => {
          if (err.status === 401) {
            // Cookies.remove('token');
            // Router.push({ pathname: '/login' });
            console.log('ressss',err)
          }
        }))
      ,
  post: (url, data = {}, params = null) => 
    superagent
      .post(config.API_DOMAIN + url)
      .query(params)
      .send(data)
      .set('x-access-token', Cookies.get('token'))
      .set('Accept', 'application/json, multipart/form-data')
      .use((req) =>
        req.on('error', (err) => {
          if (err.status === 401 && url !== '/login') {
            Cookies.remove('token');
            Router.push({ pathname: '/' });
          }
        }),
      ),

  put: (url, data = {}) =>
    superagent
      .put(config.API_DOMAIN + url)
      .send(data)
      .set('Authorization', 'Bearer ' + Cookies.get('token'))
      .set('x-access-token', Cookies.get('token'))
      .set('Accept', 'application/json, multipart/form-data')
      .use((req) =>
        req.on('error', (err) => {
          if (err.status === 401) {
            Cookies.remove('token');
            router.push({ pathname: '/' });
          }
        }),
      ),

  delete: (url, data = {}) =>
    superagent
      .delete(config.API_DOMAIN + url)
      .send(data)
      .set('Authorization', 'Bearer ' + Cookies.get('token'))
      .set('Accept', 'application/json')
      .use((req) =>
        req.on('error', (err) => {
          if (err.status === 401) {
            Cookies.remove('token');
            Router.push({ pathname: '/' });
          }
        }),
      ),

//   download: (url, data = {}) =>
//     superagent
//       .get(config.API_DOMAIN + url)
//       .query(data)
//       .set('Authorization', 'Bearer ' + Cookies.get('token'))
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/pdf')
//       .set('Content-Disposition', 'attachment; filename="qr.pdf"')
//       .responeType('blob')
//       .use((req) =>
//         req.on('error', (err) => {
//           if (err.status === 401) {
//             Cookies.remove('token');
//             router.push({ pathname: '/' });
//           }
//         }),
//       ),
};
 
export default request;