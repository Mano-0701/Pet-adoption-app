document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("adoptForm");

    form?.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !email || !address) {
            alert("Please fill all required fields.");
            return;
        }

        alert("Form submitted successfully!");
        form.reset();
    });
});
