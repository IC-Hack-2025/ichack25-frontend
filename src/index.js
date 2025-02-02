import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { io } from "socket.io-client";
import { ReactFlowProvider } from "reactflow";
import { createPortal } from "react-dom";

export const socket = io("localhost:5000");

// Create a new DOM node for the portal
const portalRoot = document.createElement("div");
portalRoot.id = "portal-root";
document.body.appendChild(portalRoot);

function PortalWrapper({ children }) {
    const portal_container = document.getElementById("portal-root");
    return createPortal(children, portal_container);
}

// Create a wrapper element for the App
const appWrapper = document.createElement("div");
appWrapper.id = "app-wrapper";
document.body.appendChild(appWrapper);

// Render the app inside the wrapper
const root = ReactDOM.createRoot(appWrapper);
root.render(
    <>
        <App />
        <ReactFlowProvider>
            <PortalWrapper />
        </ReactFlowProvider>
    </>
);
