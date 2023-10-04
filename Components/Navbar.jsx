import { TrackingContext } from "@/Context/Tracking";
import { useContext, useEffect, useState } from "react"


export default () => {
    const [state, setState] = useState(false);
    const { currentUser, connectWallet }= useContext(TrackingContext);

    const navigation = [
        { title: "Home", path: "#"},
        { title: "Services", path: "#"},
        { title: "Contact us", path: "#"},
        { title: "Erc20", path: "#"},
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if(!target.closest(".menu-btn")) setState(false);
        }
    }, [])
}