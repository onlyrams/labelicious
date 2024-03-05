import { Grid, GridCol, Input, Select, Textarea } from "@mantine/core";
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";

const templates = [
    {
        displayName: "Purple Promo",
        templateUrl:
            "/templates/promotions/promo-purple/promo-purple-template.json",
    },
    {
        displayName: "Yellow Promo",
        templateUrl:
            "/templates/promotions/promo-yellow/promo-yellow-template.json",
    },
];

export default function EditLabel() {
    const canvasRef = useRef(null);
    const [template, setTemplate] = useState(null);
    const [barcode, setBarcode] = useState("90453922");
    const [productName, setProductName] = useState("Special offer");
    const [templateName, setTemplateName] = useState("Purple Promo");

    useEffect(() => {
        const fetchTemplate = async () => {
            const templateUrl = templates.find(
                (template) => template.displayName === templateName
            ).templateUrl;
            const response = await fetch(templateUrl);
            const template = await response.json();
            setTemplate(template);
        };

        fetchTemplate();
    }, [templates, templateName]);

    console.log(template);

    useEffect(() => {
        if (!template || !barcode || !productName) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = Math.floor(template.size.width);
        canvas.height = Math.floor(template.size.height);

        let barcodeImage = new Image();

        barcodeImage.onload = () => {
            context.drawImage(
                barcodeImage,
                template.barcode.xPosition,
                template.barcode.yPosition,
                barcodeImage.width,
                barcodeImage.height
            );

            context.font = template.productName.options.font;
            context.textAlign = template.productName.options.textAlign;
            context.fillStyle = template.productName.options.fillStyle;

            context.fillText(
                productName,
                template.productName.xPosition,
                template.productName.yPosition,
                template.productName.maxWidth
            );
        };

        let bgImage = new Image();
        bgImage.src = template.background.src;
        bgImage.onload = () => {
            context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            JsBarcode(
                barcodeImage,
                barcode.padStart(13, "0"),
                template.barcode.options
            );
        };
    }, [template, barcode, productName]);

    return (
        <Grid>
            <GridCol>
                <canvas ref={canvasRef}></canvas>
                <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    mt="md"
                />
                <Input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    mt="md"
                />
                <Select
                    value={templateName}
                    onChange={setTemplateName}
                    data={templates.map((t) => t.displayName)}
                    mt="md"
                />
                <Textarea
                    autosize
                    mt="md"
                    size="sm"
                    resize="true"
                    label="Template"
                    description="JSON data for rendering the label from a template"
                    placeholder="Input placeholder"
                    value={JSON.stringify(template, null, 4)}
                    onChange={(e) => {
                        setTemplate((prev) => {
                            try {
                                return JSON.parse(e.target.value);
                            } catch (e) {
                                console.error(e);
                                setTemplate(prev);
                            }
                        });
                    }}
                />
            </GridCol>
        </Grid>
    );
}
