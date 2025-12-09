// ===================================================================
// API + DOM MANIPULATION FOR PETS PAGE WITH RANDOM DETAILS (TypeScript)
// ===================================================================

type DogApiResponse = {
    message: string;
    status: string;
};

const petGrid = document.getElementById("petGrid") as HTMLElement | null;

// Random name generator
const dogNames: string[] = [
    "Bailey", "Rocky", "Charlie", "Luna", "Cooper",
    "Milo", "Buddy", "Daisy", "Max", "Lucky"
];

// Random personalities
const dogTraits: string[] = ["Playful", "Calm", "Friendly", "Energetic", "Curious", "Loyal", "Smart"];

// Random ages
function randomAge(): number {
    return Math.floor(Math.random() * 10) + 1; // 1–10 years
}

// Extract breed name from API image URL (EXAMPLE: "husky", "retriever")
function extractBreed(url: string): string {
    const parts = url.split("/");
    return parts[parts.length - 2]?.replace(/-/g, " ") ?? "Unknown";
}

// Create API-based pet card
function createPetCard(imageUrl: string): HTMLAnchorElement {
    const name = dogNames[Math.floor(Math.random() * dogNames.length)];
    const trait = dogTraits[Math.floor(Math.random() * dogTraits.length)];
    const age = randomAge();
    const breed = extractBreed(imageUrl);

    const card = document.createElement("a") as HTMLAnchorElement;
    card.href = "adopt.html"; // API pets go to adoption form

    card.className = "bg-gray-50 shadow-md rounded-xl overflow-hidden pet-card";

    card.innerHTML = `
        <img src="${imageUrl}" class="h-48 w-full object-cover pet-img" alt="${breed} image">
        <div class="p-4">
            <h4 class="text-xl font-bold">${name}</h4>
            <p class="text-gray-600">${trait} • ${age} Years</p>
            <p class="text-gray-500 capitalize">${breed} Breed</p>
        </div>
    `;

    return card;
}

// Fetch Random Dog API and generate full pet details
async function loadRandomPets(count = 4): Promise<void> {
    if (!petGrid) return;

    for (let i = 0; i < count; i++) {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data: DogApiResponse = await response.json();

            const petCard = createPetCard(data.message);
            petGrid.appendChild(petCard);

        } catch (error) {
            console.log("API Fetch Error:", error);
        }
    }
}

// Only load on pets.html
if (petGrid) {
    void loadRandomPets();

    const btn = document.getElementById("loadPets") as HTMLButtonElement | null;
    if (btn) {
        btn.addEventListener("click", () => void loadRandomPets(4));
    }
}