import { Dropzone } from "@mantine/dropzone";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import {
    cleanCsv,
    parseProductGroup,
    parsePromo,
    splitProductGroupings,
    splitPromotions,
} from "services/csv-parse";
import JsBarcode from "jsbarcode";

const getPaddedBarcode = (barcode) => {
    if (barcode.length == 13) {
        return barcode;
    }

    if (barcode.length < 13) {
        return barcode.padStart(13, "0");
    }

    return barcode.slice(0, 13);
};

export default function PromoLabels() {
    const [promos, setPromos] = useState([]);

    console.log(promos);

    const onDropCallbackAsync = async (files) => {
        const data = [];
        const fileContents = await files[0].text();
        console.log(JSON.stringify(fileContents));
        const csv = cleanCsv(fileContents);

        const promotions = splitPromotions(csv);

        for (const promotion of promotions) {
            const [promo, ...groups] = splitProductGroupings(promotion);

            if (!promotion) {
                return;
            }

            const promoData = parsePromo(promo);

            data.push({ promoData, products: groups.map(parseProductGroup) });
        }

        setPromos(data);
    };

    useEffect(() => {
        try {
            JsBarcode(".barcode").init();
        } catch (e) {
            console.log(e);
        }
    }, [promos]);

    return (
        <div>
            <Dropzone
                onDrop={onDropCallbackAsync}
                accept={["text/csv"]}
                maxFiles={1}
                multiple={false}
            >
                <Text ta="center">Drop/select stock file</Text>
            </Dropzone>
            {promos.map((promo) => (
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    key={promo.promoData.id}
                >
                    <Card.Section>
                        <Text fw={700} size="lg" padding="lg">
                            Promotion ID: {promo.promoData.id}
                        </Text>
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{promo.promoData.name}</Text>
                        <Badge color="pink">{promo.promoData.price}</Badge>
                    </Group>

                    {promo.products.map((group) =>
                        group.map((product) => (
                            <React.Fragment key={promo.promoData.id + "-" + product.Barcode}>
                                <Text size="sm" c="dimmed">
                                    {product.Description}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    {product.Price}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    {product.Barcode}
                                    <svg
                                        className="barcode"
                                        jsbarcode-format="EAN13"
                                        jsbarcode-value={getPaddedBarcode(product.Barcode)}
                                        jsbarcode-textmargin="0"
                                        jsbarcode-fontoptions="bold"
                                    />
                                </Text>
                            </React.Fragment>
                        ))
                    )}
                </Card>
            ))}
        </div>
    );
}
