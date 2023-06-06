import { Box, Grid, Paper, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Outline.scss";
import { useNavigate, useParams } from "react-router-dom";
import SelectedTable from "./SelectedTable";
import PerSonSitting from './PersonSitting';
import {Item} from './Item';
import PersonSitting from "./PersonSitting";
import LoadingT from './Loading';
// const Item = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
//   borderWidth: 0,
//   borderRadius: 0,
//   boxShadow: "none"
// }));

const OutLine = ({ id, arrange, numRow }) => {
  // const { id, arrange, numRow } = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tablesStatus1, setTablesStatus1] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getTables(id);
     
    // (async () => {
    //   await axios
    //     .get("http://localhost:4000/api/table/status=1")
    //     .then((res) => {
    //       const temp = res?.data.table;
    //       console.log("ban co nguoi ngoi: ", temp);
    //       setTablesStatus1(temp);
    //     })
    //     .catch((error) => {
    //       console.log("Error: ", error);
    //     });
    // })();
    // if (listTable.find((tab) => tab._id === table._id)) {
    //   setListTable(listTable.filter((lt) => lt._id !== table._id));
    // } else {
    //   setListTable([...listTable, table]);
    //   }
    
  }, [id]);
 
  const getTables = async (id) => {
      await axios
        .get(`http://localhost:4000/api/lobby/${id}/detailtable/status=1`)
        // .get(`http://localhost:4000/api/lobby/${id}/table`)
        .then((res) => {
          const temp = res?.data.sit;
          console.log("Ban theo khu vu ", temp);
          setTables(temp);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          setisLoading(false);
        });
  };

  const ChooseATable = (table) => { 
     navigate(`/staff/order/table/${table._id}/${table.tbl_id}`);
    // if (listTable.find((tab) => tab._id === table._id)) {
    //   setListTable(listTable.filter((lt) => lt._id !== table._id));
    // } else {
    //   setListTable([...listTable, table]);
    //   }
  };

  return (
    <>
    {isLoading? <LoadingT /> : (
    <Box
      mt={3}
      p={3}
      minHeight={400}
      width={1000}
      sx={{
        flexGrow: 1,
        borderWidth: 2
      }}
    >
      {/* List Column */}
      {arrange === "column" ? (
        numRow === 2 ? (
          <div class="grid grid-rows-2 grid-flow-col gap-4">
            {tables.map((table, index) => (
              <Grid item key={index}>
                {table.table ? (
                  <PersonSitting table={table.table.tbl_id}></PersonSitting>
                ) : (
                  <Item position="relative" onClick={() => ChooseATable(table)}>
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                )}
              </Grid>
            ))}
          </div>
        ) : numRow === 3 ? (
          <div class="grid grid-rows-3 grid-flow-col gap-4">
            {tables.map((table, index) => (
              <Grid item key={index}>
                {table.table ? (
                  <PersonSitting table={table.table.tbl_id}></PersonSitting>
                ) : (
                  <Item position="relative" onClick={() => ChooseATable(table)}>
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                )}
              </Grid>
            ))}
          </div>
        ) : numRow === 4 ? (
          <div class="grid grid-rows-4 grid-flow-col gap-4">
            {tables.map((table, index) => (
              <Grid item key={index}>
                {table.table ? (
                  <PersonSitting table={table.table.tbl_id}></PersonSitting>
                ) : (
                  <Item position="relative" onClick={() => ChooseATable(table)}>
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                )}
              </Grid>
            ))}
          </div>
        ) : numRow === 5 ? (
          <div class="grid grid-rows-5 grid-flow-col gap-4">
            {tables.map((table, index) => (
              <Grid item key={index}>
                {table.table ? (
                  <PersonSitting table={table.table.tbl_id}></PersonSitting>
                ) : (
                  <Item position="relative" onClick={() => ChooseATable(table)}>
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                )}
              </Grid>
            ))}
          </div>
        ) : (
          <div class="grid grid-rows-6 grid-flow-col gap-4">
            {tables.map((table, index) => (
              <Grid item key={index}>
                {table.table ? (
                  <PersonSitting table={table.table.tbl_id}></PersonSitting>
                ) : (
                  <Item position="relative" onClick={() => ChooseATable(table)}>
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                )}
              </Grid>
            ))}
          </div>
        )
      ) : (
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} container>
            {tables.map((table, index) =>
              numRow === 2 ? (
                <Grid item xs={5} key={index}>
                  {table.table ? (
                    <PersonSitting table={table.table.tbl_id}></PersonSitting>
                  ) : (
                    <Item
                      position="relative"
                      onClick={() => ChooseATable(table)}
                    >
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                      {/* {listTable &&
                      listTable.map((item, index) =>
                        item._id === table._id ? (
                          <SelectedTable key={index} />
                        ) : null
                      )} */}
                    </Item>
                  )}
                </Grid>
              ) : numRow === 3 ? (
                <Grid item xs={4} key={index}>
                  {table.table ? (
                    <PersonSitting table={table.table.tbl_id}></PersonSitting>
                  ) : (
                    <Item
                      position="relative"
                      onClick={() => ChooseATable(table)}
                    >
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                      {/* {listTable &&
                      listTable.map((item, index) =>
                        item._id === table._id ? (
                          <SelectedTable key={index} />
                        ) : null
                      )} */}
                    </Item>
                  )}
                </Grid>
              ) : numRow === 4 ? (
                <Grid item xs={3} key={index}>
                  {table.table ? (
                    <PersonSitting table={table.table.tbl_id}></PersonSitting>
                  ) : (
                    <Item
                      position="relative"
                      onClick={() => ChooseATable(table)}
                    >
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                    </Item>
                  )}
                </Grid>
              ) : (
                <Grid item xs={2} key={index} marginRight={2}>
                  {table.table ? (
                    <PersonSitting table={table.table.tbl_id}></PersonSitting>
                  ) : (
                    <Item
                      position="relative"
                      onClick={() => ChooseATable(table)}
                    >
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                      {/* {listTable &&
                      listTable.map((item, index) =>
                        item._id === table._id ? (
                          <SelectedTable key={index} />
                        ) : null
                      )} */}
                    </Item>
                  )}
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      )}
    </Box>
        
    )}
    </>
  );
};

export default OutLine;
