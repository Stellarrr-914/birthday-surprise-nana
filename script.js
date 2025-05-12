function updateCountdown() {
  const targetDate = new Date("May 30, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance <= 0) {
    document.getElementById("countdown").innerText = "🎂 Hari ini ulang tahun Nana!";
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("countdown").innerText =
    `🎈 Hitung mundur: ${days} hari ${hours} jam ${minutes} menit lagi!`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

function jawabQuiz(jawaban) {
  const benar = "Pempek";
  const feedback = document.getElementById("feedback");
  if (jawaban === benar) {
    feedback.innerText = "🎉 Benar! Nana suka pempek!";
  } else {
    feedback.innerText = "🙈 Ups! Coba lagi ya~";
  }
}

function kirimPesan() {
  const pesan = document.getElementById("pesan").value.trim();
  if (pesan === "") {
    alert("Tolong isi pesan dulu ya!");
    return;
  }
  const wall = document.getElementById("memoryWall");
  const p = document.createElement("p");
  p.textContent = "📝 " + pesan;
  wall.appendChild(p);
  document.getElementById("konfirmasi").innerText = "💌 Pesanmu sudah terkirim!";
  document.getElementById("pesan").value = "";
}

async function unduhPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pesanElements = document.querySelectorAll("#memoryWall p");
  if (pesanElements.length === 0) {
    alert("Belum ada pesan untuk diunduh.");
    return;
  }
  doc.setFontSize(14);
  doc.text("Pesan Ulang Tahun untuk Nana Ika Yahana", 10, 10);
  let y = 20;
  pesanElements.forEach(p => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text("- " + p.textContent, 10, y);
    y += 10;
  });
  doc.save("pesan-untuk-nana.pdf");
}

function bagikan() {
  const url = window.location.href;
  const pesan = encodeURIComponent("🎉 Ayo rayakan ulang tahun Nana di sini! 💖 " + url);
  window.open("https://wa.me/?text=" + pesan, "_blank");
}