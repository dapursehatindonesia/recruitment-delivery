HEALTHY GO — CAREERS / RECRUITMENT WEB

KONSEP
- Home: profil singkat Healthy Go + tombol Lihat Lowongan Kerja + Langsung Lamar.
- Lowongan Kerja: hanya lowongan yang active:true di data.js.
- Lamaran: data pribadi + pengalaman kerja lebih dari satu + assessment.
- Data pribadi dan pengalaman kerja tetap menggunakan form yang sama untuk semua posisi.
- Assessment otomatis mengikuti posisi yang dipilih kandidat.
- Setiap posisi memiliki 10 Multiple Choice + 5 Essay.
- Test 1 Multiple Choice: score dihitung dan disimpan untuk HR, TIDAK ditampilkan ke kandidat.
- Test 2 Essay: TIDAK ADA SCORE. Jawaban hanya untuk review HR.
- CV tidak digunakan.
- Semua data kandidat masuk ke satu tabel Supabase: candidates.
- Pengalaman kerja disimpan dalam kolom JSONB experiences.
- Jawaban MC disimpan bersama pertanyaan, jawaban kandidat, jawaban benar, dan status benar/salah agar HR mudah melakukan review.
- Jawaban Essay disimpan bersama pertanyaannya.

FILE
- index.html      = struktur web
- style.css       = tampilan responsive
- data.js         = edit lowongan dan soal per posisi
- script.js       = alur aplikasi + insert Supabase
- config.js       = isi Supabase URL + anon/publishable key
- supabase.sql    = struktur tabel + RLS policy

SETUP SUPABASE
1. Buka Supabase project.
2. Jalankan isi supabase.sql di SQL Editor.
3. Ambil Project URL dan anon/publishable key.
4. Isi config.js.
5. Jangan masukkan service_role key ke website.

EDIT LOWONGAN
Buka data.js dan ubah recruitmentJobs.
- active:true  = lowongan tampil
- active:false = lowongan tidak tampil

EDIT SOAL PER POSISI
Buka data.js bagian recruitmentTests.
Strukturnya:
- recruitmentTests.kurir
- recruitmentTests.packing
- recruitmentTests.korlap

Masing-masing berisi:
- multipleChoice: 10 soal
- essay: 5 soal

Multiple Choice memakai answer sebagai index jawaban benar, dimulai dari 0.
Contoh:
options:['A','B','C','D'], answer:1
berarti jawaban benar adalah pilihan B.

Jika ingin menambah posisi baru:
1. Tambahkan lowongan baru di recruitmentJobs dengan id unik.
2. Tambahkan recruitmentTests dengan id yang sama.
3. Isi 10 multiple choice dan 5 essay.
4. Tidak perlu membuat tabel Supabase baru.

CATATAN KEAMANAN
Policy yang disediakan hanya INSERT untuk anon. Jangan membuat SELECT public karena data kandidat berisi informasi pribadi dan hasil assessment.
