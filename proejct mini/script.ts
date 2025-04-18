// static/script.ts

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            const nameInput = document.querySelector<HTMLInputElement>('input[name="name"]');
            const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');

            if (nameInput && emailInput) {
                if (!nameInput.value || !emailInput.value.includes("@")) {
                    e.preventDefault();
                    alert("Please fill out the form correctly!");
                }
            }
        });
    }
});
