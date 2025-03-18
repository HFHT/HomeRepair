import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export function Home() {
    const { destination } = useContext(MainContext)
    if (destination !== 'Home') return <></>

    return (
        <div>Home</div>
    )
}
