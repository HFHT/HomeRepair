import { Paper, Stack, Table, Text, Title } from "@mantine/core"
import { useHome } from "../hooks"

export function Home() {
    const { destination, tableData } = useHome()
    if (destination !== 'Home') return <></>

    return (
        <Paper>
            <Title ml={8} order={3}>Home Page</Title>
            <Stack p='xs' gap='xs' align='stretch' justify='center'>
                <Text size='md'>Repair Request Web App Visits - placeholder until dashboard developed</Text>
                <Table striped highlightOnHover withTableBorder withColumnBorders data={tableData} />
            </Stack>
        </Paper>
    )
}
