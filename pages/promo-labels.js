import { Dropzone } from "@mantine/dropzone";
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import React, { useCallback, useState } from "react";
import {
    cleanCsv,
    parseProductGroup,
    parsePromo,
    splitProductGroupings,
    splitPromotions,
} from "services/csv-parse";

export default function PromoLabels() {
    const [promos, setPromos] = useState([]);

    const onDropCallback = useCallback((files) => {
        const reader = new FileReader();

        const data = [];
        reader.onload = () => {
            const csv = cleanCsv(reader.result);

            const promotions = splitPromotions(csv);

            for (const promotion of promotions) {
                const [promo, ...groups] = splitProductGroupings(promotion);

                const promoData = parsePromo(promo);

                data.push({ promoData, products: groups.map(parseProductGroup) });
            }
        };

        reader.readAsText(files[0]);

        console.log(data);
        setTimeout(() => setPromos(data), 1000);
    });
    console.log(promos)
    return (
        <div>
            <Text>Promo Labels</Text>
            <Dropzone
                onDrop={onDropCallback}
                accept={["text/csv"]}
                maxFiles={1}
                multiple={false}
            >
                <Text ta="center">Drop stock file</Text>
            </Dropzone>
            {promos.map((promo) => (

                <Card shadow="sm" padding="lg" radius="md" withBorder key={promo.id}>
                    <Card.Section>
                        <Text fw={700} size="lg">Promotion ID: {promo.promoData.id}</Text>
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{promo.promoData.name}</Text>
                        <Badge color="pink">{promo.promoData.price}</Badge>
                    </Group>

                    {promo.products.map(group => group.map(product => (
                        <React.Fragment key={product.Barcode}>
                            <Text size="sm" c="dimmed">
                                {product.Description}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {product.Price}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {product.Barcode}
                            </Text>
                        </React.Fragment>
                    )))}

                </Card>))}

            {promos.map((promo) => (
                <div key={promo.id}>
                    <Text>{promo.promoData.id}</Text>
                    <Text>{promo.promoData.name}</Text>
                    <Text>{promo.promoData.price}</Text>
                    {promo.products.map(group => group.map(product => (
                        <React.Fragment key={product.Barcode}>
                            <Text>{product.Description}</Text>
                            <Text>{product.Price}</Text>
                            <Text>{product.Barcode}</Text>
                        </React.Fragment>
                    )))}
                </div>
            ))}
        </div>
    );
}
