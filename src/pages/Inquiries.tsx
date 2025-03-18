import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export function Inquiries() {
    const { destination } = useContext(MainContext)
    if (destination !== 'Inquiries') return <></>

    return (
        <div>Inquiries</div>
    )
}
