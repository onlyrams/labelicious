import { parse } from "csv-parse/sync";

export function parsePromo(promo) {
    const promotionIdRegex = /Promotion ID: (\d+) - /;
    const promoPriceRegEx = /(?:\£\d+(?:\.\d+)?)|\d+(?:\.\d+)?\s*(?:for\s*\£\d+(?:\.\d+)?)|(?:\d+)\s*for\s*\£(\d+(?:\.\d+)?)?\n/gi;
    const productNameRegEx = /(?<=Promotion ID: \d+ - )[\w\s/]+((?= £\d+?\.?\d{0,2}?)|(?= \d+for£\d+))/gi


    const result = {
        id: promo.match(promotionIdRegex)?.[1] ?? `MISSING: ${promo}`,
        name: promo.match(productNameRegEx)?.[0] ?? `MISSING: ${promo}`,
        price: promo.match(promoPriceRegEx)?.[0] ?? `MISSING: ${promo}`,
    };


    return result;
}

export function cleanCsv(csv) {
    const csvText = csv.replace(/=/g, "");
    const csvTextWithoutReportTitle = csvText.replace(
        "Current Promotions Report for Bury Road Store\n\n\n\n",
        ""
    );
    return csvTextWithoutReportTitle;
}

export function splitPromotions(promotions) {
    return promotions.split(
        /\n{4,7}/gi
    );
}

export function splitProductGroupings(products) {
    return products.split(/\nGroup \d+ Items\n/);
}

export function parseProductGroup(product) {
    return parse(
        product,
        {
            autoParse: true,
            skipEmptyLines: true,
            skipRecordsWithEmptyValues: true,
            bom: true,
            delimiter: ",",
            trim: true,
            columns: true,
        }
    );
}