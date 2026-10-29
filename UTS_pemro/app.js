
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

const form = document.getElementById("skinForm");
const result = document.getElementById("result");
const formError = document.getElementById("formError");

const information = {
  jerawat: {
    title: "Jerawat atau komedo",
    description:
      "Jerawat dan komedo dapat berkaitan dengan pori tersumbat, perubahan hormon, dan faktor lain. Gejala saja tidak cukup untuk memastikan penyebabnya.",
    tips: [
      "Bersihkan kulit dengan lembut.",
      "Hindari memencet jerawat.",
      "Gunakan produk perawatan yang sesuai dan hentikan jika menimbulkan iritasi."
    ]
  },

  gatal: {
    title: "Gatal pada kulit",
    description:
      "Gatal dapat berkaitan dengan kulit kering, iritasi, alergi, atau kondisi lainnya.",
    tips: [
      "Hindari menggaruk kulit.",
      "Hindari produk yang dicurigai memicu keluhan.",
      "Konsultasikan keluhan yang menetap atau mengganggu."
    ]
  },

  merah: {
    title: "Kemerahan atau iritasi",
    description:
      "Kemerahan dapat terjadi karena iritasi, alergi, paparan matahari, atau penyebab lain.",
    tips: [
      "Hindari menggosok kulit terlalu keras.",
      "Hentikan sementara produk baru yang dicurigai memicu iritasi.",
      "Cari bantuan tenaga kesehatan jika keluhan memburuk."
    ]
  },

  kering: {
    title: "Kulit kering atau bersisik",
    description:
      "Kulit kering dapat dipengaruhi cuaca, sabun, kebiasaan mandi, atau kondisi kulit tertentu.",
    tips: [
      "Gunakan pelembap lembut bila cocok.",
      "Hindari mandi dengan air terlalu panas.",
      "Periksakan kulit jika keluhan menetap atau memburuk."
    ]
  },

  bercak: {
    title: "Bercak atau perubahan warna",
    description:
      "Bercak kulit memiliki berbagai kemungkinan penyebab dan tidak dapat dipastikan hanya dari pilihan gejala ini.",
    tips: [
      "Perhatikan kapan bercak muncul dan apakah berubah.",
      "Hindari penggunaan obat kulit keras tanpa arahan tenaga kesehatan.",
      "Periksakan bercak baru, berubah, atau menetap."
    ]
  },

  nyeri: {
    title: "Nyeri atau pembengkakan",
    description:
      "Nyeri dan pembengkakan dapat berkaitan dengan peradangan atau kondisi lain yang memerlukan pemeriksaan.",
    tips: [
      "Jangan memencet atau menusuk area yang bengkak.",
      "Hindari bahan yang dapat mengiritasi kulit.",
      "Segera cari bantuan medis jika nyeri berat atau kondisi cepat memburuk."
    ]
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selected = [
    ...form.querySelectorAll('input[name="symptom"]:checked')
  ].map((input) => input.value);

  const duration = document.getElementById("duration").value;

  formError.textContent = "";
  result.hidden = true;

  if (selected.length === 0) {
    formError.textContent =
      "Silakan pilih minimal satu gejala terlebih dahulu.";
    return;
  }

  const selectedInfo = selected.map((key) => information[key]);

  const durationText = {
    baru: "Durasi yang dipilih: gejala baru muncul.",
    minggu: "Durasi yang dipilih: beberapa hari hingga minggu.",
    lama: "Durasi yang dipilih: sudah lama atau berulang."
  };

  const heading = document.createElement("h3");

  heading.textContent =
    selected.length === 1
      ? selectedInfo[0].title
      : "Ringkasan gejala yang dipilih";

  const description = document.createElement("p");

  description.textContent =
    selected.length === 1
      ? selectedInfo[0].description
      : "Kamu memilih beberapa gejala. Gejala tersebut dapat memiliki penyebab yang berbeda dan tidak cukup untuk menentukan suatu penyakit.";

  const durationInfo = document.createElement("p");
  durationInfo.textContent = durationText[duration];

  const tipsHeading = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "Saran umum:";
  tipsHeading.appendChild(strong);

  const list = document.createElement("ul");
  const tips = [
    ...new Set(selectedInfo.flatMap((item) => item.tips))
  ];

  tips.slice(0, 5).forEach((tip) => {
    const item = document.createElement("li");
    item.textContent = tip;
    list.appendChild(item);
  });

  const warning = document.createElement("p");
  warning.className = "warning";
  warning.textContent =
    "Penting: hasil ini hanya informasi edukasi, bukan diagnosis. " +
    "Jika gejala menetap, memburuk, menyebar, atau membuat khawatir, " +
    "konsultasikan kepada dokter atau tenaga kesehatan. " +
    "Jika muncul sesak napas atau pembengkakan wajah/bibir secara mendadak, " +
    "segera cari pertolongan darurat.";

  result.replaceChildren(
    heading,
    description,
    durationInfo,
    tipsHeading,
    list,
    warning
  );

  result.hidden = false;
  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});
