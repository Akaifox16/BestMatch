import { Container } from "@mui/material";
import { AppProps } from "next/app";
import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth='xl'>
      <Header />
      { children }
    </Container>
  );
}

export default Layout;