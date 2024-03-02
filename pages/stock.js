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

                    reader.onload = () => {
                        const csvText = reader.result.replace(/=/g, '');
                        const csvTextWithoutReportTitle = csvText.replace(
                            "Current Promotions Report for Bury Road Store\n\n\n\n",
                            ""
                        );

                        console.log(JSON.stringify(csvTextWithoutReportTitle));

                        var groupingSplitRegex = /\nGroup (\d+) Items\n/

                        for (const promotion of csvTextWithoutReportTitle.split(
                            "\n\n\n\n\n\n\n\n"
                        )) {
                            // console.log(JSON.stringify(promotion));
                            console.log(promotion.split(groupingSplitRegex));
                            // const [promo, products] = promotion.split(groupingSplitRegex);

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
            {
                promotions.map((p) => (
                    <div key={p.promotion}>
                        <p>{p.promotion}</p>
                        {p.products.map((product) => (
                            <p key={p.promotion + product.Barcode + product.Price}>
                                (£{product.Price}) - {product.Barcode}
                            </p>
                        ))}
                    </div>
                ))
            }
        </div >
    );
}
