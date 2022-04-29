// const Axios = {
//   get: jest.fn(() => Promise.resolve({ data: {} })),
//   create: () => Axios,
//   defaults: {
//     adapter: {},
//   },
// };

// export default Axios;

import mockAxios from "jest-mock-axios";
export default mockAxios;
