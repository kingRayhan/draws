import { PropsWithChildren } from "react";
import "@mantine/core/styles.css";
import "./globals.scss";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import ReactQueryProvider from "@/_common/providers/ReactQueryProvider";
import { ModalsProvider } from "@mantine/modals";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/_common/components/Navbar";

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
      </body>
    </html>
  );
};

export default RootLayout;
