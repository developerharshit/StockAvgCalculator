document.addEventListener("DOMContentLoaded", function () {
    const addPurchaseBtn = document.getElementById("addPurchaseBtn");
    const calculateBtn = document.getElementById("calculateBtn");
    const averageSpan = document.getElementById("average");
    const totalQuantitySpan = document.getElementById("totalQuantity");

    let purchaseIndex = 1;

    addPurchaseBtn.addEventListener("click", () => addPurchase(false));

    function addPurchase(reset = false) {
        const purchaseContainer = document.getElementById("purchaseContainer");
        const purchaseField = document.createElement("div");
        purchaseField.classList.add("purchase-field"); // Add class for styling
        if (reset) purchaseIndex = 0;
        purchaseField.innerHTML = `
            <h3>Purchase ${purchaseIndex + 1}</h3>
            <label for="unit${purchaseIndex}">Price:</label>
            <input type="number" id="unit${purchaseIndex}" class="unit" placeholder="Price">
            <label for="quantity${purchaseIndex}">Quantity:</label>
            <input type="number" id="quantity${purchaseIndex}" class="quantity" placeholder="Quantity">
        `;
        if (!reset) {
            purchaseContainer.appendChild(purchaseField)
            purchaseIndex++;
        } else {
            purchaseContainer.innerHTML = ""
            purchaseContainer.appendChild(purchaseField);
            purchaseIndex = 1
            calculate()
        }
        const units = document.querySelectorAll(".unit");
        const quantities = document.querySelectorAll(".quantity");

        units.forEach(unit => {
            unit.addEventListener("input", calculate);
        });

        quantities.forEach(quantity => {
            quantity.addEventListener("input", calculate);
        });
    }

    const units = document.querySelectorAll(".unit");
    const quantities = document.querySelectorAll(".quantity");

    units.forEach(unit => {
        unit.addEventListener("input", calculate);
    });

    quantities.forEach(quantity => {
        quantity.addEventListener("input", calculate);
    });

    resetBtn.addEventListener("click", () => addPurchase(true));

    function calculate() {
        const prices = document.querySelectorAll(".unit");
        const quantities = document.querySelectorAll(".quantity");

        let totalprices = 0;
        let totalQuantity = 0;

        for (let i = 0; i < prices.length; i++) {
            const priceValue = parseInt(prices[i].value) || 0;
            const quantityValue = parseInt(quantities[i].value) || 0;
            totalprices += priceValue * quantityValue;
            totalQuantity += quantityValue
        }

        const averagePrice = totalprices / totalQuantity;
        averageSpan.textContent = isNaN(averagePrice) ? "0" : averagePrice.toFixed(2);
        totalQuantitySpan.textContent = totalQuantity;
    }
});
