import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { DashboardLayout } from "../components/dashboard-layout";
import { TripCard } from "src/components/trip/trip-card";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const Trips = () => {
  const [data, setData] = useState([...products]);
  return (
    <>
      <Head>
        <title>Trips</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        {/* <Container maxWidth={false}> */}
          <div
            style={{
              height: "88vh",
              overflowY: "auto",
            }}
            onScroll={(event) => {
              console.log(event.currentTarget.scrollTop)
              console.log(event.currentTarget.scrollHeight)
              if (event.currentTarget.scrollTop == event.currentTarget.scrollHeight - event.currentTarget.clientHeight) {
                setData([
                  ...data,
                  {
                    id: uuid(),
                    createdAt: "04/04/2019",
                    description:
                      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
                    media: "/static/images/products/product_6.png",
                    title: "Squarespace",
                    totalDownloads: "835",
                  },
                  {
                    id: uuid(),
                    createdAt: "27/03/2019",
                    description:
                      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
                    media: "/static/images/products/product_1.png",
                    title: "Dropbox",
                    totalDownloads: "594",
                  },
                  {
                    id: uuid(),
                    createdAt: "31/03/2019",
                    description:
                      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
                    media: "/static/images/products/product_2.png",
                    title: "Medium Corporation",
                    totalDownloads: "625",
                  },
                  {
                    id: uuid(),
                    createdAt: "03/04/2019",
                    description:
                      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
                    media: "/static/images/products/product_3.png",
                    title: "Slack",
                    totalDownloads: "857",
                  },
                  {
                    id: uuid(),
                    createdAt: "04/04/2019",
                    description:
                      "Lyft is an on-demand transportation company based in San Francisco, California.",
                    media: "/static/images/products/product_4.png",
                    title: "Lyft",
                    totalDownloads: "406",
                  },
                  {
                    id: uuid(),
                    createdAt: "04/04/2019",
                    description:
                      "GitHub is a web-based hosting service for version control of code using Git.",
                    media: "/static/images/products/product_5.png",
                    title: "GitHub",
                    totalDownloads: "835",
                  },
                  {
                    id: uuid(),
                    createdAt: "04/04/2019",
                    description:
                      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
                    media: "/static/images/products/product_6.png",
                    title: "Squarespace",
                    totalDownloads: "835",
                  },
                ]);

                console.log("scrolling");
              }
            }}
          >
            <Grid container spacing={3}>
              {data.map((product) => (
                <Grid item key={product.id} lg={3} md={4} xs={6}>
                  <TripCard trip={product} />
                </Grid>
              ))}
            </Grid>
          </div>
        {/* </Container> */}
      </Box>
    </>
  );
};

Trips.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Trips;
