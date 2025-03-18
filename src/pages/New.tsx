import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export function New() {
    const { destination } = useContext(MainContext)
    if (destination !== 'New') return <></>

    return (
        <div>New</div>
    )
}
