// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  sass: {},
  routes: [
    {
      path: '/',
      component: '../pages/Login',
      Routes: ['./src/components/AdminAuthentication'],
    },
    {
      path: '/login',
      component: '../pages/Login',
      Routes: ['./src/components/AdminAuthentication'],
    },
    {
      path: '/admin',
      component: '../Wrappers',
      routes: [
        {
          path: '/admin/overview',
          component: '../pages/Overview',
          Routes: ['./src/components/AdminAuthentication'],
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'School Bus',
        dll: false,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
