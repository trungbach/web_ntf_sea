import superagent from 'superagent';
import Cookies from 'js-cookie';
import config from '@/config/index';
import Router from 'next/router'

const request = {
  get: (url, data = {}) => 
    superagent
      .get(config.API_DOMAIN + url)                                              
      .query(data)
      // .set('Authorization', 'Bearer ' +)                                
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
      .use((req) =>                                      
        req.on('error', (err) => {
          if (err.status === 401) {
            // Cookies.remove('token');
            // Router.push({ pathname: '/' });
          }
        }))
      ,

  post: (url, data = {}, params = null) => 
    superagent
      .post(config.API_DOMAIN + url)
      .query(params)
      .send(data)
      // .set('Authorization', 'Bearer ' + Cookies.get('token'))
      // .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJpYXQiOjE2Mjg0NzY2NDcsImV4cCI6MTYyODQ4Mzg0N30.QwE8Q7pGGNsPn8y2domk0yUZILuQzyPJVHDw4Ws8xOA')
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