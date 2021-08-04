import superagent from 'superagent';
import cookie from 'js-cookie';
import config from '@/config/index';
import Router from 'next/router'

const request = {
  get: (url, data = {}) => 
    superagent
      .get(config.API_DOMAIN + url)                                              
      .query(data)
      .set('Authorization', 'Bearer ' + cookie.get('token'))                                
      .set('Accept', 'application/json')    
      .use((req) =>                                      
        req.on('error', (err) => {
          if (err.status === 401) {
            cookie.remove('token');
            Router.push({ pathname: '/' });
          }
        }))
      ,
  post: (url, data = {}, params = null) => 
    superagent
      .post(config.API_DOMAIN + url)
      .query(params)
      .send(data)
      .set('Authorization', 'Bearer ' + cookie.get('token'))
      .set('Accept', 'application/json, multipart/form-data')
      .use((req) =>
        req.on('error', (err) => {
          if (err.status === 401 && url !== '/login') {
            cookie.remove('token');
            Router.push({ pathname: '/' });
          }
        }),
      ),

//   put: (url, data = {}) =>
//     superagent
//       .put(config.API_DOMAIN + url)
//       .send(data)
//       .set('Authorization', 'Bearer ' + cookie.get('token'))
//       .set('Accept', 'application/json, multipart/form-data')
//       .use((req) =>
//         req.on('error', (err) => {
//           if (err.status === 401) {
//             cookie.remove('token');
//             router.push({ pathname: '/' });
//           }
//         }),
//       ),

  delete: (url, data = {}) =>
    superagent
      .delete(config.API_DOMAIN + url)
      .send(data)
      .set('Authorization', 'Bearer ' + cookie.get('token'))
      .set('Accept', 'application/json')
      .use((req) =>
        req.on('error', (err) => {
          if (err.status === 401) {
            cookie.remove('token');
            Router.push({ pathname: '/' });
          }
        }),
      ),

//   download: (url, data = {}) =>
//     superagent
//       .get(config.API_DOMAIN + url)
//       .query(data)
//       .set('Authorization', 'Bearer ' + cookie.get('token'))
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/pdf')
//       .set('Content-Disposition', 'attachment; filename="qr.pdf"')
//       .responeType('blob')
//       .use((req) =>
//         req.on('error', (err) => {
//           if (err.status === 401) {
//             cookie.remove('token');
//             router.push({ pathname: '/' });
//           }
//         }),
//       ),
};
 
export default request;