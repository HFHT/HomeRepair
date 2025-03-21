import { Paper, Stack, Table, Title } from "@mantine/core"
import { useHome } from "../hooks"

export function Home() {
    const { destination, tableData } = useHome()
    if (destination !== 'Home') return <></>

    return (
        <Paper>
            <Title ml={8} order={3}>Home Page</Title>
            <Stack p='xs' gap='xs' align='stretch' justify='center'>
                <Table striped highlightOnHover withTableBorder withColumnBorders data={tableData} />
            </Stack>
        </Paper>
    )
}
