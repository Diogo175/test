const duftNoten = [ 
  { name: "Blumig", icon: "🌸" },
  { name: "Fruchtig", icon: "🍊" },
  { name: "Pudrig", icon: "💨" },
  { name: "Orientalisch", icon: "🔥" },
  { name: "Gourmand", icon: "🍬" },
  { name: "Holzig", icon: "🌲" },
  { name: "Aromatisch", icon: "🌿" },
  { name: "Frisch", icon: "❄️" },
];

const calineDuftListe = [
  { name: "À la Vie", category: "Damen", notes: ["Blumig", "Fruchtig"] },
  { name: "Très Jolie", category: "Damen", notes: ["Blumig", "Orientalisch"] },
  { name: "Jour en Rose", category: "Damen", notes: ["Blumig", "Orientalisch"] },
  { name: "Mon Amour", category: "Damen", notes: ["Blumig", "Pudrig"] },
  { name: "Femme Florale", category: "Damen", notes: ["Blumig", "Orientalisch"] },
  { name: "Madame Chérie", category: "Damen", notes: ["Blumig", "Orientalisch"] },
  { name: "Fleur Noir", category: "Damen", notes: ["Orientalisch", "Gourmand"] },
  { name: "Rouge Intense", category: "Damen", notes: ["Orientalisch", "Gourmand"] },
  { name: "Chérie de Fleurs", category: "Damen", notes: ["Blumig"] },
  { name: "Belle Icône", category: "Damen", notes: ["Orientalisch"] },
  { name: "Mon Paradis", category: "Damen", notes: ["Blumig", "Pudrig"] },
  { name: "Xtra Pure", category: "Herren", notes: ["Fruchtig", "Holzig"] },
  { name: "Signature Steel", category: "Herren", notes: ["Holzig"] },
  { name: "Powerful Black", category: "Herren", notes: ["Orientalisch"] },
  { name: "Absolute Blue", category: "Herren", notes: ["Aromatisch", "Frisch"] },
  { name: "Intense Gold", category: "Herren", notes: ["Orientalisch"] },
  { name: "Infinite Navy", category: "Herren", notes: ["Orientalisch"] }
];

const duftContainer = document.getElementById("duft-noten");
const showResultsBtn = document.getElementById("show-results");
const ergebnisseDiv = document.getElementById("ergebnisse");

let ausgewaehlt = new Set();

duftNoten.forEach(({ name, icon }) => {
  const kachel = document.createElement("div");
  kachel.classList.add("kachel");
  kachel.innerHTML = \`\${icon} <span>\${name}</span>\`;

  kachel.addEventListener("click", () => {
    if (ausgewaehlt.has(name)) {
      ausgewaehlt.delete(name);
      kachel.classList.remove("selected");
    } else {
      ausgewaehlt.add(name);
      kachel.classList.add("selected");
    }
    showResultsBtn.disabled = ausgewaehlt.size === 0;
  });

  duftContainer.appendChild(kachel);
});

showResultsBtn.addEventListener("click", () => {
  const auswahlArray = Array.from(ausgewaehlt);

  const gefiltert = calineDuftListe.filter(parfum =>
    auswahlArray.some(note => parfum.notes.includes(note))
  );

  ergebnisseDiv.innerHTML = "";

  if (gefiltert.length === 0) {
    ergebnisseDiv.innerHTML = "<p>Keine passenden Düfte gefunden 😢</p>";
    return;
  }

  gefiltert.forEach(({ name, category, notes }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = \`
      <h3>\${name}</h3>
      <p><strong>Typ:</strong> \${category}</p>
      <p><strong>Duftrichtung:</strong> \${notes.join(", ")}</p>
    \`;
    ergebnisseDiv.appendChild(card);
  });
});
