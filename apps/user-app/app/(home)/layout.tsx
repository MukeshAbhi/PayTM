import { JSX } from "react";
import AppbarClient from "../pages/AppbarClient";

export default function Layout({children} : {children: React.ReactNode}): JSX.Element {
    return(
        <div>
            <AppbarClient/>
        </div>
    )
}