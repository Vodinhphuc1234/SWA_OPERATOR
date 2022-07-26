import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { Provider } from "react-redux";
import store from "src/store/store";
import "../style/style.css";
import "react-toastify/dist/ReactToastify.css";
import PushNotificationLayout from "src/components/notification/NotificationLayout";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIOa8Mva82z34bP7OZHARsVdQP4Vn_rc&libraries=places"></script>
      </Head>

      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Material Kit Pro</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <PushNotificationLayout>
                {getLayout(<Component {...pageProps} />)}
              </PushNotificationLayout>
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
      </Provider>
    </>
  );
};

export default App;
