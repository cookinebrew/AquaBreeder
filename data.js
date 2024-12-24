const rules = [
    { kodePenyakit: "P1", gejala: ["G1", "G2", "G3", "G4", "G5", "G6"] },
    { kodePenyakit: "P2", gejala: ["G1", "G7", "G8", "G4", "G5", "G9"] },
    { kodePenyakit: "P3", gejala: ["G10", "G11", "G12", "G13", "G14", "G15"] },
    { kodePenyakit: "P4", gejala: ["G10", "G16", "G17", "G11", "G8", "G6"] },
    { kodePenyakit: "P5", gejala: ["G12", "G18", "G11", "G5", "G20"] },
    { kodePenyakit: "P6", gejala: ["G14", "G19", "G18", "G13", "G6", "G15"] },
];

const gejala = [
    { kode: "G1", nama: "Ikan sering menggosok-gosokkan tubuhnya ke dinding kolam" },
    { kode: "G2", nama: "Timbul bercak putih di tubuh ikan, terutama pada sirip" },
    { kode: "G3", nama: "Insang terlihat membengkak dan berwarna lebih pucat" },
    { kode: "G4", nama: "Pernafasan cepat atau tidak normal" },
    { kode: "G5", nama: "Nafsu makan menurun atau hilang" },
    { kode: "G6", nama: "Ikan tampak lemas di permukaan air" },
    { kode: "G7", nama: "Muncul bintik-bintik putih kecil di tubuh ikan, termasuk sirip dan insang" },
    { kode: "G8", nama: "Sirip ikan terlihat robek atau rusak" },
    { kode: "G9", nama: "Ikan menjadi lebih lamban atau berenang di permukaan" },
    { kode: "G10", nama: "Pendarahan pada kulit, terutama di sekitar sirip, mata, mulut, dan insang" },
    { kode: "G11", nama: "Perut ikan membengkak atau kembung" },
    { kode: "G12", nama: "Warna tubuh ikan menjadi lebih gelap atau kekuningan" },
    { kode: "G13", nama: "Mata ikan menonjol (eksoftalmia) atau terlihat bengkak" },
    { kode: "G14", nama: "Ikan berenang tidak normal, sering kali berputar-putar atau melingkar" },
    { kode: "G15", nama: "Kematian ikan tiba-tiba dan massal" },
    { kode: "G16", nama: "Muncul luka atau borok pada tubuh ikan" },
    { kode: "G17", nama: "Insang tampak memucat atau rusak" },
    { kode: "G18", nama: "Ikan menunjukkan gejala stres, seperti bernafas cepat dan tampak gelisah" },
    { kode: "G19", nama: "Kehilangan keseimbangan, ikan mungkin berenang terbalik atau dalam posisi aneh" },
    { kode: "G20", nama: "Ikan tampak lemas dan sering diam di dasar kolam" },
];

const diseases = {
    P1: {
        name: "Trichodiniasis",
        description: "Penyakit yang disebabkan oleh parasit Trichodina yang menyerang kulit dan insang ikan.",
        treatment: "Pencegahan dan Pengobatan:\n- Jaga kualitas air kolam\n- Karantina ikan yang baru\n- Pengobatan dengan formalin\n- Pemberian garam ikan\n- Penggunaan obat anti parasit"
    },
    P2: {
        name: "White Spot (Ichthyophthirius)",
        description: "Penyakit yang disebabkan oleh protozoa Ichthyophthirius multifiliis, dikenal juga sebagai penyakit bintik putih atau ich.",
        treatment: "Pencegahan dan Pengobatan:\n- Jaga suhu air stabil\n- Karantina ikan baru\n- Pengobatan dengan methylene blue\n- Pemberian garam ikan\n- Peningkatan suhu air secara bertahap"
    },
    P3: {
        name: "Viral Hemorrhagic Septicemia (VHS)",
        description: "Penyakit yang disebabkan oleh virus VHSV, menyebabkan pendarahan dan pembengkakan pada tubuh ikan.",
        treatment: "Pencegahan dan Pengobatan:\n- Karantina ikan yang terinfeksi\n- Jaga kualitas air\n- Hindari stres pada ikan\n- Vaksinasi jika tersedia\n- Tidak ada pengobatan spesifik, fokus pada pencegahan"
    },
    P4: {
        name: "Aeromonas (Aeromoniasis)",
        description: "Penyakit bakterial yang disebabkan oleh Aeromonas hydrophila, menyebabkan pendarahan dan luka pada tubuh ikan.",
        treatment: "Pencegahan dan Pengobatan:\n- Jaga kebersihan air\n- Karantina ikan sakit\n- Pemberian antibiotik\n- Pengobatan luka\n- Perbaikan kualitas air"
    },
    P5: {
        name: "Jaundice (Icterus)",
        description: "Gangguan metabolisme atau infeksi yang mempengaruhi hati atau ginjal ikan, menyebabkan perubahan warna tubuh menjadi kekuningan.",
        treatment: "Pencegahan dan Pengobatan:\n- Perbaikan kualitas air\n- Pengaturan pakan\n- Vitamin suplemen\n- Pengobatan sesuai penyebab\n- Isolasi ikan yang sakit"
    },
    P6: {
        name: "Viral Nervous Necrosis (VNN)",
        description: "Penyakit yang disebabkan oleh virus Nodavirus, mempengaruhi sistem saraf ikan dan menyebabkan gangguan keseimbangan.",
        treatment: "Pencegahan dan Pengobatan:\n- Karantina ikan baru\n- Sterilisasi peralatan\n- Vaksinasi jika tersedia\n- Tidak ada pengobatan spesifik\n- Fokus pada pencegahan penyebaran"
    }
};

