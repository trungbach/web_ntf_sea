import superagent from 'superagent';
import Cookies from 'js-cookie';
import config from '@/config/index';
import Router from 'next/router'
import {handleExprireToken} from '@/utils/index'

const request = {
  get: (url, data = {}) => 
    superagent
      .get(config.API_DOMAIN + url)                                              
      .query(data)
      .set('Accept', 'application/json')    
      .use((req) =>                                      
        req.on('error', (err) => {
          if (err.status === 401) {
          }
        }))
      ,

  getWithAccessToken: (url, data = {}, token, res, from) => 
    superagent
      .get(config.API_DOMAIN + url)                                              
      .query(data)
      .set('Accept', 'application/json')    
      .set('x-access-token', token)
      .catch(err => {
        if(err.status === 401) {
          handleExprireToken(res, from)
        }
      }),
      
  post: (url, data = {}, params = null) => 
    superagent
      .post(config.API_DOMAIN + url)
      .query(params)
      .send(data)
      .set('x-access-token', Cookies.get('token'))
      .set('Accept', 'application/json, multipart/form-data')
      .catch(err => {
        if(err.status === 401) {
            Cookies.remove('token');
            Router.push({ pathname: '/' });
        }
      }),

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