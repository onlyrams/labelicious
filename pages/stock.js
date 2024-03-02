import { Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { parse } from "csv-parse/browser/esm";
import { useState } from "react";

export default function Stock() {
    const [promotions, setPromotions] = useState([]);
    return (
        <div>
            <Dropzone
                onDrop={async (files) => {
                    // console.log(files[0]);

                    let reader = new FileReader();

                    const promotionsToAdd = [];
                    const promoStrings = [];

                    reader.onload = () => {
                        const csvText = reader.result.replace(/=/g, "");
                        const csvTextWithoutReportTitle = csvText.replace(
                            "Current Promotions Report for Bury Road Store\n\n\n\n",
                            ""
                        );

                        console.log(JSON.stringify(csvTextWithoutReportTitle));

                        var groupingSplitRegex = /\nGroup \d+ Items\n/;

                        for (const promotion of csvTextWithoutReportTitle.split(
                            "\n\n\n\n\n\n\n\n"
                        )) {
                            // console.log(JSON.stringify(promotion));
                            console.log(promotion.split(groupingSplitRegex));
                            // const [promo, products] = promotion.split(groupingSplitRegex);
                            const [promo, ...rest] = promotion.split(groupingSplitRegex);
                            console.log(JSON.stringify(promo));

                            promoStrings.push(promo);

                            const promotionIdRegex = /Promotion ID: (\d+)/;
                            const productPriceRegex = /£(\d+\.\d{2})/;
                            const productNameRegex = /Promotion ID: \d+ - (.+)£\d+\.\d{2}/;
                            const startDateRegex = /Start Date: (?<start_date>.+),End Date/;
                            const endDateRegex = /End Date: (?<end_date>.+),Promotion Type/;
                            const protectionTypeRegex = /Promotion Type: (?<protection_type>.+)\b/;
                            const promotionTextRegex = /(.+)/;

                            // Extract information using regular expressions
                            const matches = {
                                promotion_id: promo.match(promotionIdRegex)?.[1],
                                product_name: promo.match(productNameRegex)?.[1]?.trim(),
                                price: promo.match(productPriceRegex)?.[1],
                                start_date: promo.match(startDateRegex),
                                end_date: promo.match(endDateRegex),
                                protection_type: promo.match(protectionTypeRegex)[1].split(),
                                promotion_text: promo.match(promotionTextRegex)[1].trim(),
                            };

                            console.log(matches);


                            const regex = /^Promotion ID: (\d+)\s*-\s*(.*?)\s*(?:\£(\d+\.\d{2}))?(?=\s*(?:Start Date|Promotion Type)) (?:\s*Start Date: (.*?),\s*End Date: (.*?),)? \s*Promotion Type: (.*?)$/;

                            const promotions = [];

                            for (const line of promo.split('\n')) {
                                const match = line.match(regex);
                                if (match) {
                                    promotions.push({
                                        promotionId: match[1],
                                        productName: match[2].trim(),
                                        price: match[3] ? parseFloat(match[3]) : null,
                                        startDate: match[4] ? match[4].trim() : null,
                                        endDate: match[5] ? match[5].trim() : null,
                                        promotionType: match[6].trim(),
                                    });
                                }
                            }

                            // console.log(promotions);

                            // console.log(JSON.stringify(promo));

                            // console.log(promo.match(regex));
                            // console.log(rest);

                            // parse(
                            //     products,
                            //     {
                            //         skipEmptyLines: true,
                            //         skipRecordsWithEmptyValues: true,
                            //         bom: true,
                            //         delimiter: ",",
                            //         columns: true,
                            //         trim: true,
                            //     },
                            //     (err, records) => {
                            //         // console.log(err);

                            //         promotionsToAdd.push({ promotion: promo, products: records });
                            //     }
                            // );
                        }

                        setPromotions(promotionsToAdd);

                        console.log(JSON.stringify(promoStrings));

                        // const firstPromotion = csvTextWithoutReportTitle.split(',,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,')[0];

                        // const [promo, products] = firstPromotion.split(splitOnGrouping);
                        // console.log(JSON.stringify(firstPromotion));
                        // console.log(firstPromotion.split(splitOnGrouping)[0]);
                        // console.log(firstPromotion.split(splitOnGrouping)[1]);

                        // console.log(csvTextWithoutReportTitle.split(',,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,')[1]);
                        // console.log({csvText, csvTextWithoutReportTitle});
                    };

                    reader.readAsText(files[0]);
                }}
                accept={["text/csv"]}
                multiple={false}
            >
                <Text ta="center">Drop stock file</Text>
            </Dropzone>
            {promotions.map((p) => (
                <div key={p.promotion}>
                    <p>{p.promotion}</p>
                    {p.products.map((product) => (
                        <p key={p.promotion + product.Barcode + product.Price}>
                            (£{product.Price}) - {product.Barcode}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}
