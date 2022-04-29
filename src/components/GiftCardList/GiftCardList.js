import React from "react";
import PropTypes from "prop-types";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CardActions from "@mui/material/CardActions";
import { randomColorGenerator } from "../../shared/utils/randomColorGenerator";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import moment from "moment";

const GiftCardList = ({ giftCard, isAdmin, onEdit, onDelete }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        elevation={8}
        sx={{
          backgroundColor: (theme) => {
            return theme.palette.default?.main;
          },
          borderTop: `1px solid ${
            giftCard.cardCount < 10 ? "orangered" : "limegreen"
          }`,
        }}
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: randomColorGenerator() }}
                aria-label="recipe"
              >
                {giftCard.cardName.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              isAdmin && (
                <>
                  <IconButton
                    aria-label="Edit Card"
                    color="primary"
                    onClick={() => onEdit(giftCard)}
                  >
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete Card"
                    color="error"
                    onClick={() => onDelete(giftCard.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )
            }
            title={giftCard.cardName}
            subheader={moment(giftCard.expiryDate).format("MMM Do YYYY")}
          />
          <CardMedia
            component="img"
            height="140"
            image={giftCard.cardImage}
            alt="Card Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {giftCard.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {giftCard.cardShortDesc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              LinkComponent={Link}
              to={`/gift-cards/${giftCard.id}`}
            >
              View
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
};

// Props Types
GiftCardList.propTypes = {
  giftCard: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GiftCardList;
