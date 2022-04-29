import * as Styles from "@mui/styles";

const makeStyles = () => {
  return () => {
    /**
     * Note: if you want to mock this return value to be
     * different within a test suite then use
     * the pattern defined here:
     * https://jestjs.io/docs/en/manual-mocks
     **/
    return {};
  };
};

module.exports = { ...Styles, makeStyles };
