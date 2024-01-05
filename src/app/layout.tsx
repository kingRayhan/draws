import { PropsWithChildren } from "react";
import "@mantine/core/styles.css";
import "./globals.scss";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import ReactQueryProvider from "@/_common/providers/ReactQueryProvider";
import { ModalsProvider } from "@mantine/modals";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Graphland Drawing Tool",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <MantineProvider forceColorScheme="light">
            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </ReactQueryProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
};

export default RootLayout;
