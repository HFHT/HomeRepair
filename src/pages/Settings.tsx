//@ts-ignore
import { CSVLink } from "react-csv";

import { useContext } from "react"
import { MainContext } from "../context/MainContext"
import { Button, Center, Paper, Stack, Title } from "@mantine/core"
import { useSettings } from "../hooks";

export function Settings() {
    const { destination } = useContext(MainContext)
    const { webcsv } = useSettings()
    if (destination !== 'Settings') return <></>

    return (
        <Paper>
            <Center>
                <Stack p='xs' gap='xs' align='stretch' justify='center'>
                    <Title order={3}>Settings</Title>
                    <CSVLink data={webcsv} filename={'HomeRepairWebUsage.csv'}><Button>Download Web Usage</Button></CSVLink>
                </Stack>
            </Center>
        </Paper>
    )
}
