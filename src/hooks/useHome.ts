import { useContext, useEffect, useMemo, useState } from "react";
import { GoogleAddressType, WebVisitsType } from "../types";
import { getMongoItem } from "../services";
import { TableData } from "@mantine/core";
import { CONST_DB } from "../utils";
import { CONST_VISITS } from "../constants";
import { MainContext } from "../context/MainContext";
import { useVisits } from ".";

export function useHome() {
    const { destination } = useContext(MainContext)
    const { visits, getVisits, webHits, getWebHits } = useVisits()
    const [address, setTheAddress] = useState<GoogleAddressType | undefined>()
    const [webVisits, setWebVisits] = useState<WebVisitsType[] | undefined>(undefined)

    const setAddress = async (addr: GoogleAddressType | undefined) => {
        setTheAddress(addr)
        if (!addr) { console.warn('search-with-invalid-address', addr); return }
        if (!addr.place) {
            setWebVisits(undefined)
            setTheAddress(undefined)
            return
        }
        setWebVisits(await getMongoItem({ db: CONST_DB, collection: CONST_VISITS, }))
    }

    useEffect(() => {
        getVisits()
        getWebHits()
    }, [])

    //Clear the Web Visits when the user clicks to another page
    useEffect(() => {
        if (destination !== 'WebHits' && webVisits !== undefined) {
            console.log('clearing web-hits')
            setWebVisits(undefined)
            setTheAddress(undefined)
        }
    }, [destination])

    const theCaption = () => {
        if (!visits) return 'No Data'
        if (!visits[0]) return 'Not Found'
        return 'Sorted by most recently added'
    }

    const tableData: TableData = useMemo(() => {
        let rows: any = []
        if (visits) {
            rows = []
            visits.slice().reverse().forEach((vs) => {
                const row = vs.visits.map((vm, idx) => [
                    vs._id,
                    idx + 1,
                    vm?.date ? vm.date : '',
                    vm.program,
                    vm.eligiblePrograms.join(', ') || vm.notEligibleReason.map((em) => em.title).join(', '),
                    Object.entries(vm.answers).map(([key, value]) => `${key}: ${value}`).join(', ')
                ])
                rows = [...rows, ...row]
            })
        }
        return {
            caption: theCaption(),
            head: ['Address', 'Try', 'Date', 'Program', 'Eligibility', 'Answers'],
            body: rows
        }

    }, [visits])

    const tableWebHits: TableData = useMemo(() => {
        let rows: any = []
        if (webHits) {
            rows = []
            webHits.slice().reverse().forEach((vs) => {
                const row = vs.hits.map((vm, idx) => [
                    vs._id,
                    idx + 1,
                    vm.time,
                    vm.fingerprint
                ])
                rows = [...rows, ...row]
            })
        }
        return {
            caption: theCaption(),
            head: ['Date', 'Hit', 'Time', 'Fingerprint'],
            body: rows
        }
    }, [webHits])

    // const tableData: TableData = {
    //     caption: theCaption(),
    //     head: ['Date', 'Program', 'Eligibility', 'Answers'],
    //     body: !webVisits || !webVisits[0] ? [] :
    //         webVisits.map((vs) => (
    //             vs.visits.map((vm, idx) => [
    //                 vs._id,
    //                 idx + 1,
    //                 vm?.date ? vm.date : '',
    //                 vm.program,
    //                 vm.eligiblePrograms.join(', ') || vm.notEligibleReason.map((em) => em.title).join(', '),
    //                 Object.entries(vm.answers).map(([key, value]) => `${key}: ${value}`).join(', ')
    //             ])
    //         ))
    // }

    return { address, destination, setAddress, tableData, tableWebHits, webVisits } as const
}
