
"use strict";
// API + DOM MANIPULATION FOR PETS PAGE — improved error handling
const petGrid = document.getElementById("petGrid");

const dogNames = ["Bailey", "Rocky", "Charlie", "Luna", "Cooper", "Milo", "Buddy", "Daisy", "Max", "Lucky"];
const dogTraits = ["Playful", "Calm", "Friendly", "Energetic", "Curious", "Loyal", "Smart"];

function randomAge() {
	return Math.floor(Math.random() * 10) + 1;
}

function extractBreed(url) {
	const parts = url.split("/");
	const maybe = parts[parts.length - 2];
	return maybe ? maybe.replace(/-/g, " ") : "Unknown";
}

function createPetCard(imageUrl) {
	const name = dogNames[Math.floor(Math.random() * dogNames.length)];
	const trait = dogTraits[Math.floor(Math.random() * dogTraits.length)];
	const age = randomAge();
	const breed = extractBreed(imageUrl);
	const card = document.createElement("a");
	card.href = "adopt.html";
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

function showError(message) {
	if (!petGrid)
		return;
	// remove existing error if any
	const existing = document.getElementById("petApiError");
	if (existing)
		existing.remove();
	const el = document.createElement("div");
	el.id = "petApiError";
	el.className = "mb-6 p-4 rounded-lg bg-red-100 text-red-800";
	el.textContent = message;
	petGrid.parentNode.insertBefore(el, petGrid);
}

async function loadRandomPets(count = 4) {
	if (!petGrid)
		return;
	try {
		// Use the bulk endpoint to reduce requests and surface errors clearly
		const url = `https://dog.ceo/api/breeds/image/random/${count}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Network response was not ok (${response.status})`);
		}
		const data = await response.json();
		// dog.ceo returns { message: [..] } when count > 1
		const images = Array.isArray(data.message) ? data.message : [data.message];
		images.forEach((img) => {
			const petCard = createPetCard(img);
			petGrid.appendChild(petCard);
		});
	}
	catch (error) {
		console.error("API Fetch Error:", error);
		showError("Unable to load pets right now. Please try again later.");
	}
}

if (petGrid) {
	void loadRandomPets();
	const btn = document.getElementById("loadPets");
	if (btn) {
		btn.addEventListener("click", () => void loadRandomPets(4));
	}
}
