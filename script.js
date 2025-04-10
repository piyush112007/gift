let currentMemory = 0;
let memoryUnlockCount =
  parseInt(sessionStorage.getItem("memoryUnlockCount")) || 0; // Load from sessionStorage
const unlockedMemories = new Set(
  JSON.parse(sessionStorage.getItem("unlockedMemories")) || []
); // Load unlocked memories

function nextMemory(index) {
  const memories = document.querySelectorAll(".memory");
  if (index < memories.length) {
    memories[currentMemory].style.display = "none";
    memories[index].style.display = "block";
    currentMemory = index;
    sessionStorage.setItem("currentMemory", currentMemory); // Save current memory index
  }
}

function exitMemoryLane() {
  document.body.innerHTML = `
    <h1 style="color: #4caf50; margin-top: 20px;">Goodbye! ❤️</h1>
    <p style="color: #4caf50; font-size: 1.5rem; margin: 20px;">
      Thank you for reliving these beautiful memories with me. Until next time!
    </p>
  `;
}

const memoryDetails = {
  memory2: {
    title: "Memory 1",
    description:
      "Pata hai Janhavi yeh photo mujhe hamesha yaad dilati hai woh din jab hum stairs pe chad rahe the tumhari chapal tut gayi thi woh pehla din tha jab tumne mera haath pakda tha us time woh normal tha par aab bhaut he jada sepecial hai.",
    image: "Photos-001 (1)/IMG-20241011-WA0034.jpg",
  },
  memory3: {
    title: "Memory 2",
    description:
      "Pata hai Janhavi yeh photo mujhe hamesha ek gana yaad dilati guess karo konsa??........... yaad aaya?? and now ab jab bhi yeh gana sunta hoon toh woh tasveer yaad aati hai, shyd woh tasveer he hamari kahani ki shuruaat thi.",
    image: "Photos-001 (1)/Snapchat-2085502112.jpg",
  },
  memory6: {
    title: "Memory 3",
    description:
      "Pata hai Janhavi yeh photo mujhe woh din yaad dilati hai jab maine pehli baar tumhe batya tha ki mai kya feel karta hu. Woh auto me baithe hu 20 min kaafi lamba tha par waha se sab hua tha aur mujhe pata chala tha ki mai akela nahi hu jo feel karta hu",
    image: "Photos-001 (1)/IMG20250113143653.jpg",
  },
  memory9: {
    title: "Memory 4",
    description:
      "Pata hai Janhavi yeh photo mujhe Ignite k din yaad dilati jo saaadi me kamal lag rahi thi. Woh din jab humne dance kiya aur uske baad ka woh hug meri life the best hug tha. Woh tha mere liye hamesha relationship ka pehla gift.",
    image: "Photos-001 (1)/IMG-20250218-WA0020.jpg",
  },
  memory12: {
    title: "Memory 5",
    description:
      "Pata hai Janhavi yeh photo kuch yaad nahi dilati bas yeh dikahti hai ki har lambha jo mai tumhare saath rehta hu khush rehta hu,chahta hu ki tum mere saath raho, har waqt, har pal, har din, har saal, har janam. Yeh tasveer kehti ki mahine bas 2 hue hai aur saal abhi bhaut baaki hai.",
    image: "Photos-001 (1)/IMG-20250218-WA0024.jpg",
  },
  // Add more memories here...
};

function showMemory(memoryKey) {
  const memory = memoryDetails[memoryKey];
  if (memory) {
    const url = `imageDisplay.html?title=${encodeURIComponent(
      memory.title
    )}&description=${encodeURIComponent(
      memory.description
    )}&image=${encodeURIComponent(memory.image)}`;
    sessionStorage.setItem("currentMemory", currentMemory); // Save current memory index
    window.location.href = url;

    // Add memory to the unlocked set
    if (!unlockedMemories.has(memoryKey)) {
      unlockedMemories.add(memoryKey);
      memoryUnlockCount++;
      sessionStorage.setItem("memoryUnlockCount", memoryUnlockCount); // Save count
      sessionStorage.setItem(
        "unlockedMemories",
        JSON.stringify(Array.from(unlockedMemories))
      ); // Save unlocked memories
    }
  }
}

function closeMemory() {
  const modal = document.getElementById("memory-modal");
  modal.style.display = "none";
}

function returnToMemoryLane() {
  closeMemory();
  const memories = document.querySelectorAll(".memory");
  memories.forEach((memory, index) => {
    memory.style.display = index === currentMemory ? "block" : "none";
  });
}

function resetMemoryLane() {
  sessionStorage.removeItem("currentMemory"); // Clear saved memory index
  sessionStorage.removeItem("memoryUnlockCount"); // Clear memory unlock count
  sessionStorage.removeItem("unlockedMemories"); // Clear unlocked memories
  currentMemory = 0; // Reset to the first memory
  memoryUnlockCount = 0; // Reset unlock count
  unlockedMemories.clear(); // Clear unlocked set
  const memories = document.querySelectorAll(".memory");
  memories.forEach((memory, index) => {
    memory.style.display = index === currentMemory ? "block" : "none";
  });
}

window.addEventListener("load", () => {
  const savedMemory = sessionStorage.getItem("currentMemory");
  if (savedMemory !== null) {
    currentMemory = parseInt(savedMemory, 10);
    const memories = document.querySelectorAll(".memory");
    memories.forEach((memory, index) => {
      memory.style.display = index === currentMemory ? "block" : "none";
    });
  }
});
