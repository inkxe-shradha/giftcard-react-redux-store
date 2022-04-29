import {
  Card,
  Container,
  Grid,
  CardHeader,
  CardContent,
  Typography,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
const styles = makeStyles((theme) => ({
  userPaper: {
    padding: theme.spacing(2),
    border: "1px solid" + theme.palette.primary.main,
    wordBreak: "break-all",
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.secondary.main,
  },
}));
export const Profile = ({ user }) => {
  const classes = styles();
  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Paper
            elevation={12}
            sx={{
              padding: "2rem",
            }}
          >
            <Card>
              <CardHeader
                title="Profile Details"
                action={
                  <IconButton
                    aria-label="back to dashboard"
                    LinkComponent={Link}
                    color="inherit"
                    to="/"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  {/* Avatar Content */}
                  <Grid
                    item
                    xs={12}
                    margin={"auto"}
                    md={4}
                    alignContent="center"
                    justifyContent="center"
                  >
                    <Avatar
                      alt={user?.name}
                      src={user?.imageUrl}
                      sx={{ width: 200, height: 200 }}
                      className={classes.avatar}
                    />
                  </Grid>
                  {/* User Details */}
                  <Grid item xs={12} md={8}>
                    <div>
                      <Typography variant="h6">Name</Typography>
                      <Paper elevation={5} className={classes.userPaper}>
                        {user?.name}
                      </Paper>
                    </div>
                    <div>
                      <Typography variant="h6">Email</Typography>
                      <Paper elevation={5} className={classes.userPaper}>
                        {user?.email}
                      </Paper>
                    </div>
                    <div>
                      <Typography variant="h6">Balance</Typography>
                      <Paper elevation={5} className={classes.userPaper}>
                        {user?.balance_points || 0} <strong>$</strong>
                      </Paper>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
