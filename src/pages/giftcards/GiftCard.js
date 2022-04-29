import {
  Container,
  Grid,
  Typography,
  Divider,
  Tooltip,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import {
  addGiftCard,
  loadGiftCard,
  deleteGiftCardList,
} from "../../store/actions/giftCardAction";
import GiftCardList from "../../components/GiftCardList/GiftCardList";
import AddEditGiftCard from "../../components/MangeGiftCard/AddEditGiftCard";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { RESET_CARDS } from "../../store/types/giftCardTypes";
import debounce from "lodash.debounce";
const staticFilterArr = [
  "All",
  "Amazon",
  "Zomato",
  "Uber",
  "Microsoft",
  "Swiggy",
  "Flipkart",
  "Food Panda",
];

const GiftCard = () => {
  const pageNumber = React.useRef(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [searchText, setSearchText] = React.useState("");
  const [sortBy, setSortBy] = React.useState("none");
  const sortByOrder = React.useRef(undefined);
  const [filterBy, setFilterBy] = React.useState("All");
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [singleCard, setSingleCard] = React.useState({});
  const [currentMode, setCurrentMode] = React.useState("add");
  const dispatch = useDispatch();

  const { giftCards, user, cardLoadingState, hasMore } = useSelector(
    (state) => ({
      giftCards: state.giftCard.giftCardList,
      hasMore: state.giftCard.hasMoreCard,
      user: state.auth.user,
      cardLoadingState: state.giftCard.cardLoader,
    })
  );

  const loadGiftCardList = useCallback(() => {
    dispatch(
      loadGiftCard(
        pageNumber.current,
        pageSize,
        searchText,
        { type: sortBy, sortByOrder: sortByOrder.current },
        filterBy
      )
    );
  }, [
    dispatch,
    filterBy,
    pageNumber,
    pageSize,
    sortByOrder,
    searchText,
    sortBy,
  ]);

  const handelSearchInput = (event) => {
    resetCardView();
    setSearchText(event.target.value);
  };

  const handelDebouncedSearch = useMemo((e) => {
    return debounce(handelSearchInput, 300);
  }, []);

  React.useEffect(() => {
    giftCards.length === 0 && loadGiftCardList();
    return () => {
      handelDebouncedSearch?.cancel();
      if (searchText || sortBy !== "none" || filterBy !== "All") {
        resetCardView();
      }
    };
  }, [loadGiftCardList, filterBy, searchText]);

  const fetchMoreData = () => {
    pageNumber.current += 1;
    loadGiftCardList();
  };

  const handelFormCardFormSubmit = (value) => {
    if (currentMode === "add") {
      resetCardView();
    }
    dispatch(addGiftCard(value)).then(() => {
      setOpenModal(false);
      currentMode === "add"
        ? toast.success("Gift Card Added Successfully")
        : toast.success("Gift Card Updated Successfully");
    });
  };

  const handelCloseModal = () => {
    setOpenModal(false);
  };

  const handelEditCard = (card) => {
    setSingleCard(card);
    setCurrentMode("edit");
    setOpenModal(true);
  };

  const onClickAddCard = (event) => {
    setCurrentMode("add");
    setOpenModal(true);
  };

  const handelRemoveCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteGiftCardList(id)).then(() => {
          toast.success("Gift Card Deleted Successfully");
          Swal.close();
        });
      }
    });
  };

  const resetCardView = () => {
    dispatch({
      type: RESET_CARDS,
    });
    pageNumber.current = 1;
  };

  const handelFilterByRetailer = (event) => {
    resetCardView();
    sortByOrder.current = undefined;
    setSortBy("none");
    setFilterBy(event.target.value);
  };

  const handelSortBy = (event) => {
    resetCardView();
    if (event.target.value === "none") {
      sortByOrder.current = undefined;
    } else {
      sortByOrder.current = "asc";
    }
    setSortBy(event.target.value);
  };

  const handelOrderType = (type) => {
    resetCardView();
    sortByOrder.current = type;
    loadGiftCardList();
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {user.role === "admin" && (
                <Button
                  variant="outlined"
                  color="success"
                  className="float-right"
                  onClick={onClickAddCard}
                >
                  {" "}
                  Add New Card{" "}
                </Button>
              )}
              <Typography sx={{ marginBlock: 2 }} variant="h4" align="center">
                Gift Cards
              </Typography>
              <Divider />
              {/* Filter Type */}
              <Grid
                container
                spacing={4}
                className="my-2"
                alignContent="center"
              >
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="filter-by-retailer">
                      Filter By Retailer:{" "}
                    </InputLabel>
                    <Select
                      color="primary"
                      labelId="filter-by-retailer"
                      id="filter-by-retailer"
                      label="Filter By Retailer"
                      value={filterBy}
                      onChange={handelFilterByRetailer}
                    >
                      {staticFilterArr.map((filter) => (
                        <MenuItem key={filter} value={filter}>
                          {filter}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  {/* Search Box */}
                  <TextField
                    fullWidth
                    label="Search Here"
                    placeholder="Search Gift cards"
                    id="fullWidth"
                    name="searchText"
                    onChange={handelDebouncedSearch}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sm={4}
                  className="d-flex justify-content-end"
                >
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="sort-by">Sort By: </InputLabel>
                    <Select
                      labelId="sort-by"
                      value={sortBy}
                      id="sort-by"
                      label="Age"
                      onChange={handelSortBy}
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="points">Points</MenuItem>
                      <MenuItem value="counts">Counts</MenuItem>
                      {filterBy === "All" && (
                        <MenuItem value="cardName">Names</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  {sortByOrder.current && (
                    <>
                      {sortByOrder.current === "asc" ? (
                        <Tooltip title={"Ascending Order"}>
                          <IconButton
                            sx={{ margin: "10px 0" }}
                            onClick={() => handelOrderType("desc")}
                          >
                            <ArrowUpwardIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title={"Descending Order"}>
                          <IconButton
                            sx={{ margin: "10px 0" }}
                            onClick={() => handelOrderType("asc")}
                          >
                            <ArrowDownwardIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
              {/* Card List */}
              <InfiniteScroll
                dataLength={giftCards.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LinearProgress color="success" />}
              >
                <Grid container spacing={2}>
                  {giftCards.length > 0 &&
                    giftCards.map((giftCard) => (
                      <GiftCardList
                        giftCard={giftCard}
                        key={giftCard.id}
                        onEdit={handelEditCard}
                        onDelete={handelRemoveCard}
                        isAdmin={user.role === "admin"}
                      />
                    ))}
                  {/* No data found */}
                  {giftCards.length === 0 && (
                    <Grid item xs={12}>
                      <Typography variant="h6" align="center">
                        No Data Found
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </InfiniteScroll>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {user.role === "admin" && isOpenModal && (
        <AddEditGiftCard
          isOpen={isOpenModal}
          handelSubmitted={handelFormCardFormSubmit}
          errorMessage=""
          giftCard={singleCard}
          isLoading={cardLoadingState}
          onClose={handelCloseModal}
          mode={currentMode}
        />
      )}
    </Container>
  );
};

// Props types
GiftCard.propTypes = {};

export default GiftCard;
