const pilihBangun = document.getElementById("pilih-bangun");
const tombolHitung = document.getElementById("tombol-hitung");
const kotakHasil = document.getElementById("hasil");

const grupKubus = document.getElementById("grup-kubus");
const grupBalok = document.getElementById("grup-balok");
const grupTabung = document.getElementById("grup-tabung");
const grupBola = document.getElementById("grup-bola");
const grupKerucut = document.getElementById("grup-kerucut");

const PI = Math.PI;

function tampilkanInputYangSesuai() {
  const pilihan = pilihBangun.value;

  grupKubus.classList.add("sembunyi");
  grupBalok.classList.add("sembunyi");
  grupTabung.classList.add("sembunyi");
  grupBola.classList.add("sembunyi");
  grupKerucut.classList.add("sembunyi");

  if (pilihan === "kubus") grupKubus.classList.remove("sembunyi");
  if (pilihan === "balok") grupBalok.classList.remove("sembunyi");
  if (pilihan === "tabung") grupTabung.classList.remove("sembunyi");
  if (pilihan === "bola") grupBola.classList.remove("sembunyi");
  if (pilihan === "kerucut") grupKerucut.classList.remove("sembunyi");

  kotakHasil.innerHTML =
    '<p class="hasil-kosong">Hasil perhitungan akan muncul di sini.</p>';
}

function ambilAngka(idInput) {
  const nilai = parseFloat(document.getElementById(idInput).value);

  if (isNaN(nilai) || nilai <= 0) {
    tampilkanPesanError("Mohon isi semua kolom dengan angka lebih besar dari 0 ya 🙂");
    return null;
  }

  return nilai;
}

function tampilkanPesanError(pesan) {
  kotakHasil.innerHTML = `<p class="pesan-error">${pesan}</p>`;
}

function formatAngka(angka) {
  return angka.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function hitung() {
  const pilihan = pilihBangun.value;

  let namaBangun = "";
  let volume = 0;
  let luas = 0;

  if (pilihan === "kubus") {
    const s = ambilAngka("kubus-sisi");
    if (s === null) return;

    volume = s * s * s;
    luas = 6 * s * s;
    namaBangun = "Kubus";
  } else if (pilihan === "balok") {
    const p = ambilAngka("balok-panjang");
    const l = ambilAngka("balok-lebar");
    const t = ambilAngka("balok-tinggi");
    if (p === null || l === null || t === null) return;

    volume = p * l * t;
    luas = 2 * (p * l + p * t + l * t);
    namaBangun = "Balok";
  } else if (pilihan === "tabung") {
    const r = ambilAngka("tabung-jari");
    const t = ambilAngka("tabung-tinggi");
    if (r === null || t === null) return;

    volume = PI * r * r * t;
    luas = 2 * PI * r * (r + t);
    namaBangun = "Tabung";
  } else if (pilihan === "bola") {
    const r = ambilAngka("bola-jari");
    if (r === null) return;

    volume = (4 / 3) * PI * r * r * r;
    luas = 4 * PI * r * r;
    namaBangun = "Bola";
  } else if (pilihan === "kerucut") {
    const r = ambilAngka("kerucut-jari");
    const t = ambilAngka("kerucut-tinggi");
    if (r === null || t === null) return;

    const s = Math.sqrt(r * r + t * t);

    volume = (1 / 3) * PI * r * r * t;
    luas = PI * r * (r + s);
    namaBangun = "Kerucut";
  }

  kotakHasil.innerHTML = `
    <h2 class="hasil-judul">Hasil Perhitungan ${namaBangun}</h2>
    <p class="hasil-baris">Volume: <strong>${formatAngka(volume)}</strong></p>
    <p class="hasil-baris">Luas Permukaan: <strong>${formatAngka(luas)}</strong></p>
  `;
}

pilihBangun.addEventListener("change", tampilkanInputYangSesuai);
tombolHitung.addEventListener("click", hitung);

tampilkanInputYangSesuai();
