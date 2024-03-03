import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

export default function EditLabel() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const scale = 1; //window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(670 * scale);
        canvas.height = Math.floor(112 * scale);
        context.scale(scale, scale);


        let barcode = new Image();

        barcode.onload = () => {
            context.drawImage(barcode, 0, canvas.height - barcode.height, barcode.width, barcode.height);
            context.font = "36px sans-serif";
            context.textAlign = "center";
            context.fillText("Special offer", (canvas.width / 2) + 125, (canvas.height / 2) + 10, 200);
        }

        let bgImage = new Image();
        bgImage.src = '/promo-bg.png';
        bgImage.onload = () => {
            context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

            JsBarcode(barcode, "123456789012", {
                format: "EAN13",
                height: 20,
                textMargin: 0,
                fontSize: 12,
                margin: 0,
            });

        }
    }, []);

    return (
        <div>
            <h1>Edit Label</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}