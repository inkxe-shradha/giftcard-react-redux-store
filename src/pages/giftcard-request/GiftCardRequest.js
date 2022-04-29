import React from "react";
import { Container, Typography, Paper, Divider } from "@mui/material";
import NoDataTable from "../../shared/Components/NodataTable/NoDataTable";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { Table, Column } from "react-virtualized/dist/commonjs/Table";
import { WindowScroller } from "react-virtualized/dist/commonjs/WindowScroller";
import "react-virtualized/styles.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { loadGiftCardSent } from "../../store/actions/giftCardAction";

const GiftCardRequest = () => {
  const { user, giftCardSent } = useSelector((state) => ({
    user: state.auth.user,
    giftCardSent: state.giftCard.giftCardSent,
  }));
  const dispatch = useDispatch();
  console.log(giftCardSent);
  React.useState(() => {
    dispatch(loadGiftCardSent(user.email));
  }, [dispatch, user.email]);
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
        elevation={3}
      >
        <Typography variant="h4" align="center">
          Gift Card Sends
        </Typography>
        <Divider
          sx={{
            marginBlock: (theme) => theme.spacing(2),
          }}
        />
        <div className="row">
          <div className="col-md-12">
            <div className="table table-dark">
              {giftCardSent.length > 0 ? (
                <WindowScroller>
                  {({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <AutoSizer disableHeight>
                      {({ width }) => (
                        <Table
                          width={width}
                          autoHeight
                          height={height}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          scrollTop={scrollTop}
                          headerHeight={60}
                          rowHeight={50}
                          rowCount={giftCardSent.length}
                          rowGetter={({ index }) => giftCardSent[index]}
                        >
                          <Column
                            label="Card name"
                            dataKey="cardName"
                            width={150}
                          />
                          <Column
                            label="Points"
                            dataKey="cardPoints"
                            width={100}
                          />
                          <Column
                            label="Card Desc"
                            dataKey="cardShortDesc"
                            width={100}
                          />
                          <Column
                            label="Sent To"
                            dataKey="receiverEmail"
                            width={350}
                          />
                          <Column
                            label="Issued Date"
                            dataKey="issueDate"
                            width={150}
                            cellDataGetter={({ rowData }) =>
                              moment(rowData.cardIssueDate).format("DD-MM-YYYY")
                            }
                          />
                          <Column
                            label="Expiry Date"
                            dataKey="expiryDate"
                            width={150}
                            cellDataGetter={({ rowData }) =>
                              moment(rowData.cardExpiryDate).format(
                                "DD-MM-YYYY"
                              )
                            }
                          />
                        </Table>
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              ) : (
                <NoDataTable type="sent" />
              )}
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default GiftCardRequest;
