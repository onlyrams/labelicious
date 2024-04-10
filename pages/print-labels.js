import LabelPreview from "@components/label-preview/label-preview";
import { Button, Paper, Space, Tabs, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";

const barcode = {
    barcode: '123456789012',
    labelType: 'shelf-edge',
    template: 'medium'
}

export default function PrintLabels() {
    const [labels, setLabels] = useState([]);
    const [currentBarcode, setCurrentBarcode] = useState("");

    return (
        <>
            <Tabs keepMounted={false} defaultValue="shelf-edge" variant="pills">
                <Tabs.List>
                    <Tabs.Tab value="shelf-edge">Shelf Edge</Tabs.Tab>
                    <Tabs.Tab value="promotion">Promotion</Tabs.Tab>
                </Tabs.List>

                <Space h="md" />

                <Tabs.Panel value="shelf-edge">
                    <Tabs
                        keepMounted={false}
                        defaultValue="medium"
                        orientation="vertical"
                    >
                        <Tabs.List>
                            <Tabs.Tab value="small">Small</Tabs.Tab>
                            <Tabs.Tab value="medium">Medium</Tabs.Tab>
                            <Tabs.Tab value="large">Large</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="small" p="md">
                            <TextInput
                                label="Barcode"
                                description="Enter or scan a barcode"
                                value={currentBarcode}
                                onChange={(e) => setCurrentBarcode(e.target.value)}
                                mb="md"
                                size="md"
                            />
                            {currentBarcode && <LabelPreview barcode={currentBarcode} />}
                            <Button
                                onClick={() => setLabels((prev) => [...prev, currentBarcode])}
                                m={1}
                                ml={3}
                            >
                                Add
                            </Button>
                        </Tabs.Panel>
                        <Tabs.Panel value="medium" p="md">
                            <Button
                                onClick={() => setLabels((prev) => [...prev, "Medium"])}
                                m={1}
                            >
                                Medium
                            </Button>
                        </Tabs.Panel>
                        <Tabs.Panel value="large" p="md">
                            <Button
                                onClick={() => setLabels((prev) => [...prev, "Large"])}
                                m={1}
                            >
                                Large
                            </Button>
                        </Tabs.Panel>
                    </Tabs>
                </Tabs.Panel>
                <Tabs.Panel value="promotion">
                    <LabelPreview />
                </Tabs.Panel>
            </Tabs>
            <Space h="md" />
            <Title order={1}>Print Queue</Title>
            <Title order={2}>{labels.length} labels</Title>
            {labels && labels.map((label) => <Paper withBorder shadow="xs" p="md" mb="md" key={label}>{label}</Paper>)}
        </>
    );
}
