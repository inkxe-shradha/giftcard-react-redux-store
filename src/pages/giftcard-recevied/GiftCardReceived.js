import React, { useEffect } from "react";
import { Container, Typography, Paper, Divider, Button } from "@mui/material";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { Table, Column } from "react-virtualized/dist/commonjs/Table";
import { WindowScroller } from "react-virtualized/dist/commonjs/WindowScroller";
import "react-virtualized/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loadGiftCardReceived,
  redeemGiftCard,
} from "../../store/actions/giftCardAction";
import moment from "moment";
import NoDataTable from "../../shared/Components/NodataTable/NoDataTable";
import Swal from "sweetalert2/dist/sweetalert2";
import { toast } from "react-toastify";

const GiftCardReceived = () => {
  const { user, giftCardReceived } = useSelector((state) => ({
    user: state.auth.user,
    giftCardReceived: state.giftCard.giftCardReceived,
  }));

  const dispatch = useDispatch();
  const redeemCoupon = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to redeem the coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Redeem",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Please wait...",
          text: "Redeeming coupon...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        dispatch(redeemGiftCard(data)).then(() => {
          toast.success("Coupon Redeemed Successfully");
          Swal.close();
        });
      }
    });
  };
  const actionCell = ({ rowData }) => {
    // console.log(data);
    return !rowData.isRedeemed ? (
      <Button
        size="small"
        color="success"
        onClick={() => redeemCoupon(rowData)}
      >
        Redeem
      </Button>
    ) : (
      <Button size="small" color="error" disabled>
        Redeemed
      </Button>
    );
  };

  useEffect(() => {
    giftCardReceived.length === 0 && dispatch(loadGiftCardReceived(user.email));
  }, [dispatch, user]);

  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
        elevation={3}
      >
        <Typography variant="h4" align="center">
          Gift Card Received
        </Typography>
        <Divider
          sx={{
            marginBlock: (theme) => theme.spacing(2),
          }}
        />
        <div className="row">
          <div className="col-md-12 table-responsive">
            <div className="table table-dark">
              {giftCardReceived.length > 0 ? (
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
                          rowCount={giftCardReceived.length}
                          rowGetter={({ index }) => giftCardReceived[index]}
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
                            label="Received From"
                            dataKey="senderEmail"
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
                          <Column
                            label="Actions"
                            dataKey=""
                            width={150}
                            cellRenderer={(data) => actionCell(data)}
                          />
                        </Table>
                      )}
                    </AutoSizer>
                  )}
                </WindowScroller>
              ) : (
                <NoDataTable type="received" />
              )}
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default GiftCardReceived;
