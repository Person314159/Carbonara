import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { mantineHtmlProps, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
    title: "Carbonara",
    description: "Comprehensive And Rapid Browser for Organized Navigation And Route Assistance: A P.E.S.T.O. Train Router"
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <body className="vsc-initialized font-sans bg-[#f0f0f0] m-0 p-5 text-[#333] flex-col">
        <MantineProvider>
            {children}
        </MantineProvider>
        </body>
        </html>
    );
}
