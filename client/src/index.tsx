import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { NewStoreProvider } from "./stores/NewsStore";
import { mainTheme } from "./style/config";
import { PhotosStoreProvider } from "./stores/PhotographsStore";
import { ServiceStoreProvider } from "./stores/ServiceStore";
import { ConfessionStoreProvider } from "./stores/ConfessionStore";
import { ParagraphStoreProvider } from "./stores/AboutUsStore";
import { AlbumStoreProvider } from "./stores/GalleryStore";
import { AuthStoreProvider } from "./stores/AuthStore";
import { LanguageProvider } from "./stores/LanguageStore";
import "./lang/i18n";
import { PriestProvider } from "./stores/PriestStore";
require("dotenv").config();

ReactDOM.render(
  <LanguageProvider>
    <ThemeProvider theme={mainTheme}>
      <AuthStoreProvider>
        <StylesProvider injectFirst>
          <NewStoreProvider>
            <PriestProvider>
              <ServiceStoreProvider>
                <ConfessionStoreProvider>
                  <AlbumStoreProvider>
                    <PhotosStoreProvider>
                      <ParagraphStoreProvider>
                        <App />
                      </ParagraphStoreProvider>
                    </PhotosStoreProvider>
                  </AlbumStoreProvider>
                </ConfessionStoreProvider>
              </ServiceStoreProvider>
            </PriestProvider>
          </NewStoreProvider>
        </StylesProvider>
      </AuthStoreProvider>
    </ThemeProvider>
  </LanguageProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
