
// const promo = "Promotion ID: 8022650010000 - Peperami Pizza Bun £1.25\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.25";

import { useState } from "react";

const promos = ["Promotion ID: 8022460010000 - Hardys Stamp £6.49\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 6.49",
    "Promotion ID: 8022470010000 - McGuigan Black £6.99\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 6.99",
    "Promotion ID: 8022480010000 - Trivento Sel £8.49\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 8.49",
    "Promotion ID: 8022490010000 - Barefoot Sel £7.99\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 7.99",
    "Promotion ID: 8022500010000 - Harveys/Croft Sherry £12.99\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 12.99",
    "Promotion ID: 8022510010000 - Pepsi 24pk £10\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 10.00",
    "Promotion ID: 8022520010000 - Boost Energy 3for£1.75\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Multi BuyBuy 3 of the following Items for 1.75",
    "Promotion ID: 8022530010000 - Mogu Mogu Sel 2for£2\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Multi BuyBuy 2 of the following Items for 2.00",
    "Promotion ID: 8022540010000 - Jacks hot X Buns £1.25\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.25",
    "Promotion ID: 8022550010000 - Warburtons Bread Sel £1.55\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.55",
    "Promotion ID: 8022560010000 - Hovis Seeds Orig £1.85\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.85",
    "Promotion ID: 8022570010000 - Mission Plain Tort Wrap £1.50\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.50",
    "Promotion ID: 8022580010000 - Cad/MrK Cake Bars £1.59\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.59",
    "Promotion ID: 8022590010000 - Sharwoods Sel 2for£4\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Multi BuyBuy 2 of the following Items for 4.00",
    "Promotion ID: 8022600010000 - Marmite Sel £2\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 2.00",
    "Promotion ID: 8022610010000 - Encona Sauce Sel £1.29\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.29",
    "Promotion ID: 8022620010000 - Geetas Prem Chutney Sel £1.89\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.89",
    "Promotion ID: 8022630010000 - Go Cat Sel £2.49\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 2.49",
    "Promotion ID: 8022640010000 - Gourmet Monpetit £1.99\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.99",
    "Promotion ID: 8022650010000 - Peperami Pizza Bun £1.25\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.25",
    "Promotion ID: 8022660010000 - Onken Yogurt Sel £1.75\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.75",
    "Promotion ID: 8022670010000 - Muller Corner 4pk £2.25\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 2.25",
    "Promotion ID: 8022680010000 - Cadbury POJ £2\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 3.99",
    "Promotion ID: 8022690010000 - McC Quick Cook Chips £1.29\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 1.29",
    "Promotion ID: 8022700010000 - Walls Viennetta 2for£3\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Multi BuyBuy 2 of the following Items for 3.00",
    "Promotion ID: 8022850010000 - Jacks Med Chicken £3.99\nStart Date: Mon 26th Feb 2024,End Date: Tue 26th Mar 2024,Promotion Type: Reduced ToThe following Items are Reduced to 3.99"];

function parsePromo(promo) {
    const promotionIdRegex = /Promotion ID: (\d+) - /;
    const promoPriceRegEx = /(?:\£\d+(?:\.\d+)?)|\d+(?:\.\d+)?\s*(?:for\s*\£\d+(?:\.\d+)?)|(?:\d+)\s*for\s*\£(\d+(?:\.\d+)?)?\n/gi;
    const productNameRegEx = /(?<=Promotion ID: \d+ - )[\w\s/]+((?= £\d+?\.?\d{0,2}?)|(?= \d+for£\d+))/gi


    const result = {
        id: promo.match(promotionIdRegex)[1],
        name: promo.match(productNameRegEx)[0],
        price: promo.match(promoPriceRegEx)[0],
    };

    console.log(result);

    return result;
}

export default function Labels() {
    const [labelPromos,] = useState(promos.map(parsePromo));

    return (
        <div>
            <p>Labels</p>
            {labelPromos.map((promo) => (
                <div key={promo.id}>
                    <span>{promo.name}</span> - <span>{promo.price}</span>
                </div>
            ))}
        </div>
    );
}
