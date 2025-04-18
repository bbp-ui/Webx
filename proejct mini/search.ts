// static/search.ts

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search") as HTMLInputElement | null;
    const tableRows = document.querySelectorAll<HTMLTableRowElement>("#participantsTable tbody tr");

    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const query = searchInput.value.toLowerCase();

            tableRows.forEach((row) => {
                const nameCell = row.cells[0];
                const name = nameCell.textContent?.toLowerCase() || "";

                row.style.display = name.includes(query) ? "" : "none";
            });
        });
    }
});
