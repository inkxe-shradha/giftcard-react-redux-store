import { Grid, Container, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    border: "1px solid" + theme.palette.primary.main,
    wordBreak: "break-all",
  },
  container: {
    marginBlockStart: "1em",
  },
}));
const StaticCoupons = () => {
  const classes = styles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography align="center" variant="h4">
            Most Viewed Coupons
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container margin="custom" spacing={2}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://pngimg.com/uploads/amazon/amazon_PNG21.png"
                  alt="Amazon Card"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Amazon Gift (5000)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amazon Gift Cards are the Perfect Gift, Every Time. Use the
                    eBay Gift Card to shop from millions of items .....
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://i.pinimg.com/originals/15/aa/16/15aa1678d4ee5615c5c53ed5c9968126.png"
                  alt="FlipKart"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Flip-kart (5000)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flipkart Pvt Ltd. is an e-commerce company based in
                    Bengaluru, India. Founded by Sachin Bansal and Binny Bansal
                    in 2007 ...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://img.etimg.com/thumb/msid-52350287,width-300,imgsize-34171,resizemode-4/myntra-app-faces-tech-glitch-spams-users-with-notifications.jpg"
                  alt="Myntra"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Myntra
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Myntra Gift Cards are the Perfect Gift, Every Time. Use the
                    Myntra Gift Card to shop from millions of items in
                    Electronics...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cms.qz.com/wp-content/uploads/2015/05/zomatos-4th-logo-2012-14.png?w=900&h=900&crop=1&strip=all&quality=75"
                  alt="Zomato"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Zomato (5000)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Zomato. Zomato is an Indian restaurant search and discovery
                    service founded in 2008 by Deepinder Goyal ....
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* View More */}
            <Grid item xs={12} md={12} align="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                LinkComponent={Link}
                to="/gift-cards"
              >
                View More
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaticCoupons;
