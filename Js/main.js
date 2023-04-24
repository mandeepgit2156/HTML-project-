
const products = document.querySelectorAll(".product .price");

const cart = [];

for (const product of products) {
    product.addEventListener("click", function () {
        const parent = product.closest(".product");
        const name = parent.querySelector("h2").textContent;

        const exists = cart.find(function (item) {
            return item.name === name;
        });

        if (exists) {
            ++exists.quantity;
            return;
        }

        const price = parseFloat(product.textContent.replace("$", ""));

        cart.push({ quantity: 1, price, name });
    });
}

const cartModal = document.querySelector("#cartModal");
const receipt = document.querySelector("#receipt");
const tbody = document.querySelector("table tbody");
const total = document.querySelector("#total");

const cartButton = document.querySelector("#cart");

cartModal.onclick = function () {
    cartModal.style.display = "none";
}

cartButton.onclick = function (event) {
    event.preventDefault();

    for (const item of cart) {
        const row = document.createElement("tr");
        const quantityCell = document.createElement("td");
        const itemCell = document.createElement("td");
        const priceCell = document.createElement("td");

        quantityCell.textContent = item.quantity;
        itemCell.textContent = item.name;
        priceCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        row.append(quantityCell);
        row.append(itemCell);
        row.append(priceCell);

        tbody.append(row);
    }

    const sum = cart.reduce(function (a, b) {
        return a + (b.price * b.quantity);
    }, 0);

    total.textContent = `$${sum.toFixed(2)}`;

    cartModal.style.display = "flex";
};

const texts = document.querySelectorAll("body *:not(nav, nav *)");
const increase = document.querySelector("#increase");
const decrease = document.querySelector("#decrease");

increase.addEventListener("click", function (event) {
    event.preventDefault();

    for (const text of texts) {
        if (text.children.length === 0) {
            const fontSize = parseFloat(window.getComputedStyle(text, null).getPropertyValue('font-size'));

            text.style.fontSize = `${fontSize + 1}px`;
        }
    }
});

decrease.addEventListener("click", function (event) {
    event.preventDefault();

    for (const text of texts) {
        if (text.children.length === 0) {
            const fontSize = parseFloat(window.getComputedStyle(text, null).getPropertyValue('font-size'));

            text.style.fontSize = `${fontSize - 1}px`;
        }
    }
});
