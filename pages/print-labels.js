import { Button, Tabs } from "@mantine/core";
import { useState } from "react";

export default function PrintLabels() {
    const [labels, setLabels] = useState([]);

    return (
        <>
            {labels && labels.map((label) => <div key={label}>{label}</div>)}
            <Tabs keepMounted={false} defaultValue="shelf-edge" variant="pills">
                <Tabs.List>
                    <Tabs.Tab value="shelf-edge">Shelf Edge</Tabs.Tab>
                    <Tabs.Tab value="promotion">Promotion</Tabs.Tab>
                </Tabs.List>
                <br />
                <Tabs.Panel value="shelf-edge">
                    <Tabs keepMounted={false} defaultValue="medium" variant="outline">
                        <Tabs.List>
                            <Tabs.Tab value="small">Small</Tabs.Tab>
                            <Tabs.Tab value="medium">Medium</Tabs.Tab>
                            <Tabs.Tab value="large">Large</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="small">
                            Small
                            <Button onClick={() => setLabels((prev) => [...prev, "Small"])}>Set</Button>
                        </Tabs.Panel>
                        <Tabs.Panel value="medium">Medium</Tabs.Panel>
                        <Tabs.Panel value="large">Large</Tabs.Panel>
                    </Tabs>
                </Tabs.Panel>
                <Tabs.Panel value="promotion">Second panel</Tabs.Panel>
            </Tabs>
        </>
    );
}
