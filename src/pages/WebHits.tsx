import { Paper, Stack, Table, Text, Title } from "@mantine/core"
import { useWebVisits } from "../hooks";
import { GoogleAutocomplete } from "../components";

export function WebHits() {
    const { destination, setAddress, tableData } = useWebVisits()

    if (destination !== 'WebHits') return <></>

    return (
        <Paper>
            <Title ml={8} order={3}>WebApp - Search Repair Inquiry Visits</Title>
            <Stack p='xs' gap='xs' align='stretch' justify='center'>
                <Stack gap={0}>
                    <Text>Property Address</Text>
                    <GoogleAutocomplete placeholder={`Address...`}
                        setAddress={(e: any) => {
                            console.log('setaddress', e)
                            setAddress(e)
                        }} />
                </Stack>
                <Table striped highlightOnHover withTableBorder withColumnBorders data={tableData} />
            </Stack>
        </Paper>
    )
}
