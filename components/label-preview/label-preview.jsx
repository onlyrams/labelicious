import { useEffect, useState, useRef } from "react";
import JsBarcode from "jsbarcode";
const template = {
  background: {
    // src: "/templates/promotions/promo-yellow/promo-yellow.png",
  },
  size: {
    width: 670,
    height: 112,
  },
  barcode: {
    options: {
      // format: "EAN13",
      height: 20,
      textMargin: 0,
      fontSize: 12,
      margin: 0,
      background: "transparent",
    },
    xPosition: 10,
    yPosition: 10,
  },
  productName: {
    options: {
      font: "36px sans-serif",
      textAlign: "center",
      fillStyle: "#000",
    },
    xPosition: 335,
    yPosition: 70,
  },
};

export default function LabelPreview(props) {
  const [barcode, setBarcode] = useState(props.barcode || "90453922"); // From props
  const [productName, setProductName] = useState("Special offer"); // From props - or lookup barcode
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!template || !barcode || !productName) {
      return;
    }

    const canvas = canvasRef.current;
    let context = canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(template.size.width * scale);
    canvas.height = Math.floor(template.size.height * scale);
    context.scale(scale, scale);

    let barcodeImage = new Image();

    barcodeImage.onload = () => {
      context.drawImage(
        barcodeImage,
        template.barcode.xPosition,
        template.barcode.yPosition,
        barcodeImage.width,
        barcodeImage.height
      );

      context = Object.assign(context, template.productName.options);

      context.fillText(
        productName,
        template.productName.xPosition,
        template.productName.yPosition,
        template.productName.maxWidth
      );
    };

    if (template.background.src) {
      let bgImage = new Image();
      bgImage.src = template.background.src;
      bgImage.onload = () => {
        context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        JsBarcode(
          barcodeImage,
          barcode.padStart(getBarcodeType(barcode) == "EAN8" ? 8 : 13, "0"),
          { ...template.barcode.options, format: getBarcodeType(barcode) }
        );
      };
    } else {
      JsBarcode(
        barcodeImage,
        barcode.padStart(getBarcodeType(barcode) == "EAN8" ? 8 : 13, "0"),
        { ...template.barcode.options, format: getBarcodeType(barcode) }
      );
    }
  }, [template, barcode, productName]);
  return (
    <canvas
      height={template.size.height}
      width={template.size.width}
      ref={canvasRef}
    ></canvas>
  );
}

function getBarcodeType(barcode) {
  if (barcode.length <= 8) {
    return "EAN8";
  }

  return "EAN13";
}
