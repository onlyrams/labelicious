import { Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { parse } from 'csv-parse/browser/esm';

export default function Stock() {

    return (
        <div>
            <Dropzone
                onDrop={async (files) => {
                    // console.log(files[0]);

                    let reader = new FileReader();

                    reader.onload = () => {
                        const csvText = reader.result;
                        const csvTextWithoutReportTitle = csvText.replace('Current Promotions Report for Bury Road Store,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n', '');

                        const splitOnGrouping = '\r\nGroup 1 Items,,,,,\r\n';

                        for (const promotion of csvTextWithoutReportTitle.split(',,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,')) {
                            const [promo, products] = promotion.split(splitOnGrouping);
                            console.log({ promo, products });

                            parse(products, {
                                skipEmptyLines: true,
                                skipRecordsWithEmptyValues: true,
                                bom: true,
                                delimiter: ',',
                                columns: true,
                                trim: true,

                            }, (err, records) => {
                                // console.log(err);

                                console.log({ promotion: { promo }, products: records });
                            });
                        }

                        // const firstPromotion = csvTextWithoutReportTitle.split(',,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,')[0];

                        // const [promo, products] = firstPromotion.split(splitOnGrouping);
                        // console.log(JSON.stringify(firstPromotion));
                        // console.log(firstPromotion.split(splitOnGrouping)[0]);
                        // console.log(firstPromotion.split(splitOnGrouping)[1]);

                        // console.log(csvTextWithoutReportTitle.split(',,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,\r\n,,,,,')[1]);
                        // console.log({ csvText, csvTextWithoutReportTitle });

                    }

                    reader.readAsText(files[0]);
                }}
                accept={["text/csv"]}
                multiple={false}
            >
                <Text ta="center">Drop stock file</Text>
            </Dropzone>
        </div>
    );
}
