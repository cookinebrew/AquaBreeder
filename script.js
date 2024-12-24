// Tambahkan variabel global untuk tracking diagnosa
let currentDiagnosis = {
    selectedGejala: [],
    currentRules: [],
    currentQuestionIndex: 0,
    answeredQuestions: []
};

// Fungsi untuk memulai diagnosa
function startDiagnosis() {
    const selectedInitialGejala = document.querySelector('#initialGejalaList .selected');
    if (!selectedInitialGejala) {
        alert("Silakan pilih gejala awal!");
        return;
    }

    const gejalaKode = selectedInitialGejala.dataset.kode;
    currentDiagnosis.selectedGejala = [gejalaKode];
    
    // Filter rules yang memiliki gejala awal yang dipilih
    currentDiagnosis.currentRules = rules.filter(rule => 
        rule.gejala.includes(gejalaKode)
    );

    if (currentDiagnosis.currentRules.length === 0) {
        showFinalDiagnosis();
    } else {
        currentDiagnosis.currentQuestionIndex = 0;
        showNextQuestion();
    }
}

// Fungsi untuk menampilkan pertanyaan berikutnya
function showNextQuestion() {
    // Kumpulkan semua gejala yang mungkin dari rules yang tersisa
    const possibleGejala = new Set();
    currentDiagnosis.currentRules.forEach(rule => {
        rule.gejala.forEach(g => {
            // Tambahkan pengecekan untuk memastikan gejala belum pernah dijawab
            const alreadyAnswered = currentDiagnosis.answeredQuestions.some(
                qa => qa.gejalaKode === g
            );
            if (!currentDiagnosis.selectedGejala.includes(g) && !alreadyAnswered) {
                possibleGejala.add(g);
            }
        });
    });

    if (possibleGejala.size === 0) {
        // Cek apakah ada rule yang sudah terpenuhi sepenuhnya
        const bestMatch = currentDiagnosis.currentRules[0];
        if (bestMatch) {
            const matchingSymptoms = currentDiagnosis.selectedGejala.filter(g => 
                bestMatch.gejala.includes(g)
            ).length;
            
            // Jika tingkat kesesuaian cukup tinggi (misalnya > 75%)
            if (matchingSymptoms / bestMatch.gejala.length > 0.75) {
                showFinalDiagnosis(bestMatch);
            } else {
                showFinalDiagnosis();
            }
        } else {
            showFinalDiagnosis();
        }
        return;
    }

    // Tampilkan pertanyaan berikutnya
    const nextGejala = Array.from(possibleGejala)[0];
    const gejalaData = gejala.find(g => g.kode === nextGejala);

    document.getElementById('initial-symptoms').classList.remove('active');
    document.getElementById('follow-up-questions').classList.add('active');
    document.getElementById('current-question').textContent = gejalaData.nama;
    document.getElementById('follow-up-questions').dataset.currentGejala = nextGejala;
}

// Fungsi untuk memproses jawaban
function answerQuestion(isYes) {
    const currentGejala = document.getElementById('follow-up-questions').dataset.currentGejala;
    const gejalaData = gejala.find(g => g.kode === currentGejala);
    
    // Cek apakah gejala sudah pernah dijawab
    const alreadyAnswered = currentDiagnosis.answeredQuestions.some(
        qa => qa.gejalaKode === currentGejala
    );
    
    if (alreadyAnswered) {
        alert("Gejala ini sudah pernah dijawab!");
        return;
    }
    
    // Simpan jawaban
    currentDiagnosis.answeredQuestions.push({
        gejalaKode: currentGejala,
        question: gejalaData.nama,
        answer: isYes
    });
    
    if (isYes) {
        currentDiagnosis.selectedGejala.push(currentGejala);
        currentDiagnosis.currentRules = currentDiagnosis.currentRules.filter(rule =>
            rule.gejala.includes(currentGejala)
        );
    } else {
        currentDiagnosis.currentRules = currentDiagnosis.currentRules.filter(rule =>
            !rule.gejala.includes(currentGejala)
        );
    }

    updateAnswerHistory();

    // Cek apakah ada rule yang sudah terpenuhi sepenuhnya
    const fulfilledRule = currentDiagnosis.currentRules.find(rule => {
        const matchingSymptoms = rule.gejala.filter(g => 
            currentDiagnosis.selectedGejala.includes(g)
        );
        return matchingSymptoms.length === rule.gejala.length;
    });

    if (fulfilledRule) {
        showFinalDiagnosis(fulfilledRule);
    } else if (currentDiagnosis.currentRules.length === 0) {
        showFinalDiagnosis();
    } else {
        showNextQuestion();
    }
}

// Fungsi untuk menampilkan hasil akhir
function showFinalDiagnosis(matchedRule = null) {
    let diagnosis = "";
    let treatment = "";

    if (matchedRule) {
        const disease = diseases[matchedRule.kodePenyakit];
        const matchingSymptoms = currentDiagnosis.selectedGejala.filter(g => 
            matchedRule.gejala.includes(g)
        ).length;
        const percentage = Math.round((matchingSymptoms / matchedRule.gejala.length) * 100);

        diagnosis = `Diagnosa Penyakit Terdeteksi!\n\n` +
                   `Berdasarkan gejala-gejala yang dipilih, ikan mengalami:\n\n` +
                   `${disease.name}\n` +
                   `${disease.description}\n\n` +
                   `Tingkat kesesuaian: ${percentage}%\n` +
                   `Gejala yang terdeteksi: ${matchingSymptoms} dari ${matchedRule.gejala.length} gejala\n\n` +
                   `Gejala yang cocok:\n` +
                   currentDiagnosis.selectedGejala
                       .filter(g => matchedRule.gejala.includes(g))
                       .map(g => `- ${gejala.find(item => item.kode === g).nama}`)
                       .join('\n');

        treatment = `Pencegahan dan Pengobatan untuk ${disease.name}:\n${disease.treatment}`;
        
        // Sembunyikan tombol Ya/Tidak karena diagnosa sudah selesai
        document.querySelector('.button-group').style.display = 'none';
    } else {
        diagnosis = "Penyakit Tidak Terdeteksi\n\n" +
                   "Berdasarkan gejala-gejala yang dipilih, tidak ditemukan penyakit yang sesuai dalam database. " +
                   "Silakan konsultasikan dengan dokter hewan untuk pemeriksaan lebih lanjut.";
        treatment = "Saran umum:\n" +
                   "1. Jaga kualitas air tetap baik\n" +
                   "2. Periksa parameter air secara rutin\n" +
                   "3. Berikan pakan yang berkualitas\n" +
                   "4. Hindari kepadatan ikan yang berlebihan\n" +
                   "5. Konsultasikan dengan dokter hewan untuk diagnosa yang lebih akurat";
    }

    // Tampilkan hasil
    const resultDiv = document.getElementById("result");
    document.getElementById("diagnosis").innerText = diagnosis;
    document.getElementById("treatment").innerText = treatment;
    resultDiv.style.display = "block";
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Inisialisasi gejala awal
window.onload = function() {
    const initialGejalaList = document.getElementById('initialGejalaList');
    
    // Tampilkan semua gejala yang ada
    gejala.forEach(gejalaData => {
        const div = document.createElement('div');
        div.dataset.kode = gejalaData.kode;
        div.innerHTML = `
            <div class="gejala-item">
                <div class="gejala-content">
                    <span class="gejala-kode">${gejalaData.kode}</span>
                    <span class="gejala-nama">${gejalaData.nama}</span>
                </div>
            </div>
        `;
        div.onclick = function() {
            document.querySelectorAll('#initialGejalaList div').forEach(d => 
                d.classList.remove('selected'));
            this.classList.add('selected');
        };
        initialGejalaList.appendChild(div);
    });

    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Tampilkan daftar penyakit
    displayDiseases();
}

// Fungsi untuk menampilkan riwayat jawaban
function updateAnswerHistory() {
    const historyContainer = document.getElementById('answeredQuestions');
    historyContainer.innerHTML = '';
    
    currentDiagnosis.answeredQuestions.forEach((qa, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-item';
        answerDiv.innerHTML = `
            <span class="answer-text">
                <span class="question">${qa.question}</span>
                <span class="answer ${qa.answer ? 'yes' : 'no'}">${qa.answer ? 'Ya' : 'Tidak'}</span>
            </span>
            <button class="delete-answer" onclick="deleteAnswer(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        historyContainer.appendChild(answerDiv);
    });

    // Update status tombol mulai ulang
    const restartBtn = document.querySelector('.restart-btn');
    if (currentDiagnosis.answeredQuestions.length === 0) {
        restartBtn.disabled = true;
        restartBtn.classList.add('disabled');
    } else {
        restartBtn.disabled = false;
        restartBtn.classList.remove('disabled');
    }
}

// Update fungsi deleteAnswer
function deleteAnswer(index) {
    if (confirm('Apakah Anda yakin ingin menghapus jawaban ini?')) {
        // Simpan gejala awal
        const initialGejala = currentDiagnosis.selectedGejala[0];
        
        // Hapus jawaban yang dipilih dan semua jawaban setelahnya
        currentDiagnosis.answeredQuestions = currentDiagnosis.answeredQuestions.slice(0, index);
        
        // Reset selectedGejala ke gejala awal
        currentDiagnosis.selectedGejala = [initialGejala];
        
        // Reset rules ke semua rules yang memiliki gejala awal
        currentDiagnosis.currentRules = rules.filter(rule => 
            rule.gejala.includes(initialGejala)
        );

        // Ulangi semua jawaban yang tersisa untuk memfilter rules yang relevan
        currentDiagnosis.answeredQuestions.forEach(qa => {
            if (qa.answer) {
                currentDiagnosis.selectedGejala.push(qa.gejalaKode);
                currentDiagnosis.currentRules = currentDiagnosis.currentRules.filter(rule =>
                    rule.gejala.includes(qa.gejalaKode)
                );
            } else {
                currentDiagnosis.currentRules = currentDiagnosis.currentRules.filter(rule =>
                    !rule.gejala.includes(qa.gejalaKode)
                );
            }
        });

        // Tampilkan kembali tombol Ya/Tidak jika sebelumnya disembunyikan
        document.querySelector('.button-group').style.display = 'flex';
        
        // Sembunyikan hasil diagnosa jika sedang ditampilkan
        document.getElementById('result').style.display = 'none';

        // Update riwayat dan tampilkan pertanyaan berikutnya
        updateAnswerHistory();
        showNextQuestion();
    }
}

// Fungsi untuk memulai ulang diagnosa
function restartDiagnosis() {
    if (currentDiagnosis.answeredQuestions.length === 0) return;

    if (confirm('Apakah Anda yakin ingin memulai ulang diagnosa?')) {
        // Simpan gejala awal yang dipilih
        const initialGejala = currentDiagnosis.selectedGejala[0];
        
        // Reset state diagnosa tapi tetap di halaman yang sama
        currentDiagnosis = {
            selectedGejala: [initialGejala], // Tetap pertahankan gejala awal
            currentRules: rules.filter(rule => rule.gejala.includes(initialGejala)),
            currentQuestionIndex: 0,
            answeredQuestions: []
        };

        // Update tampilan
        document.getElementById('result').style.display = 'none';
        updateAnswerHistory();
        showNextQuestion();
    }
}

// Fungsi untuk mencari gejala
function searchGejala() {
    const searchText = document.getElementById('gejalaSearch').value.toLowerCase();
    const gejalaItems = document.querySelectorAll('#initialGejalaList > div');
    
    gejalaItems.forEach(item => {
        const gejalaText = item.textContent.toLowerCase();
        if (gejalaText.includes(searchText)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
} 

// Update fungsi goBack
function goBack() {
    // Kembali ke halaman pemilihan gejala awal
    document.getElementById('follow-up-questions').classList.remove('active');
    document.getElementById('initial-symptoms').classList.add('active');
    document.getElementById('result').style.display = 'none';
    
    // Reset state diagnosa
    currentDiagnosis = {
        selectedGejala: [],
        currentRules: [],
        currentQuestionIndex: 0,
        answeredQuestions: []
    };
    
    // Hapus seleksi gejala awal
    document.querySelectorAll('#initialGejalaList div').forEach(d => 
        d.classList.remove('selected'));
        
    // Kosongkan riwayat jawaban
    const historyContainer = document.getElementById('answeredQuestions');
    historyContainer.innerHTML = '';
    
    // Tampilkan kembali tombol Ya/Tidak jika sebelumnya disembunyikan
    document.querySelector('.button-group').style.display = 'flex';
}

// Fungsi untuk menampilkan daftar penyakit
function displayDiseases() {
    const diseasesContainer = document.getElementById('diseases-list');
    
    Object.entries(diseases).forEach(([code, disease]) => {
        const relatedSymptoms = rules
            .filter(rule => rule.kodePenyakit === code)
            .flatMap(rule => rule.gejala)
            .map(gejalaKode => gejala.find(g => g.kode === gejalaKode).nama);

        const card = document.createElement('div');
        card.className = 'disease-card';
        card.innerHTML = `
            <div class="disease-header">
                <h3>${disease.name}</h3>
                <span class="disease-code">${code}</span>
            </div>
            <div class="disease-content">
                <p>${disease.description}</p>
                <h4>Gejala-gejala:</h4>
                <ul>
                    ${[...new Set(relatedSymptoms)].map(symptom => 
                        `<li>${symptom}</li>`
                    ).join('')}
                </ul>
                <div class="disease-treatment">
                    <h4>Pencegahan dan Pengobatan:</h4>
                    <p>${disease.treatment}</p>
                </div>
            </div>
        `;
        diseasesContainer.appendChild(card);
    });
}

// Fungsi untuk mencari penyakit
function searchDiseases() {
    const searchText = document.getElementById('diseaseSearch').value.toLowerCase();
    const diseaseCards = document.querySelectorAll('.disease-card');
    
    diseaseCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        if (content.includes(searchText)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}