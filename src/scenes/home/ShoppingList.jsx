import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:3000/items",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cleaningHouseholdsItems = items.filter(
    (item) => item.attributes.category === "cleaningHouseholds"
  );
  const freshFoodItems = items.filter(
    (item) => item.attributes.category === "freshFood"
  );
  const beverageItems = items.filter(
    (item) => item.attributes.category === "beverage"
  );
  const babyProductsItems = items.filter(
    (item) => item.attributes.category === "babyProducts"
  );
  const healthFitnessItems = items.filter(
    (item) => item.attributes.category === "healthFitness"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="FRESH FOODS" value="freshFood" />
        <Tab label="BEVERAGES" value="beverage" />
        <Tab label="BABY PRODUCTS" value="babyProducts" />
        <Tab label="CLEANING & HOUSEHOLD" value="cleaningHouseholds" />
        <Tab label="HEALTH & FITNESS" value="healthFitness
        " />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "freshFood" &&
          freshFoodItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "beverage" &&
          beverageItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "cleaningHouseholds" &&
          cleaningHouseholdsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === "babyProducts" &&
          babyProductsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
           {value === "healthFitness" &&
          healthFitnessItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
