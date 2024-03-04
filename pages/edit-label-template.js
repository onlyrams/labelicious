import { Textarea } from "@mantine/core";
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";

export default function EditLabel() {
    const canvasRef = useRef(null);
    const [template, setTemplate] = useState(null);

    useEffect(() => {
        const fetchTemplate = async () => {
            const response = await fetch('/templates/promotions/promo-purple/promo-purple-template.json');
            const template = await response.json();
            setTemplate(template);
            return template;
        }

        fetchTemplate();
    }, [setTemplate]);

    console.log(template);

    useEffect(() => {
        if (!template) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = Math.floor(template.size.width);
        canvas.height = Math.floor(template.size.height);

        let barcode = new Image();

        barcode.onload = () => {
            context.drawImage(barcode, template.barcode.xPosition, template.barcode.yPosition, barcode.width, barcode.height);
            context.font = template.productName.options.font;
            context.textAlign = template.productName.options.textAlign;

            context.fillText("Special offer", template.productName.xPosition, template.productName.yPosition, template.productName.maxWidth);
        }

        let bgImage = new Image();
        bgImage.src = template.background.src;
        bgImage.onload = () => {
            context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

            const barcodeId = 90453922;
            JsBarcode(barcode, barcodeId.toString().padStart(13, "0"), template.barcode.options);

        }
    }, [template]);

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
            <Textarea
                rows={20}
                mt="md"
                size="sm"
                resize="true"
                label="Template"
                description="JSON data for rendering the label from a template"
                placeholder="Input placeholder"
                value={JSON.stringify(template, null, 4)}
                onChange={(e) => setTemplate(JSON.parse(e.target.value))}
            />
        </div>
    );
}