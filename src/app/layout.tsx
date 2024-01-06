import ReactQueryProvider from "@/_common/providers/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.scss";

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
        <ClerkProvider>
          <ReactQueryProvider>
            <MantineProvider forceColorScheme="light">
              <ModalsProvider>{children}</ModalsProvider>
            </MantineProvider>
          </ReactQueryProvider>
        </ClerkProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
};

export default RootLayout;
