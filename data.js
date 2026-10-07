// EDIT DATA LOWONGAN & SOAL DI FILE INI.
//
// LOWONGAN:
// - active:true  = tampil di website
// - active:false = tidak tampil
//
// SOAL:
// - Setiap posisi memiliki 10 Multiple Choice + 5 Essay.
// - answer adalah index jawaban benar, dimulai dari 0.
// - Essay tidak memiliki score.

const recruitmentJobs = [
  {
    id:'kurir',
    title:'Kurir',
    location:'Jakarta',
    type:'Full Time',
    summary:'Mengantarkan pesanan dengan aman, tepat, dan profesional.',
    description:'Menjalankan proses delivery sesuai standar Healthy Go dan menjaga kualitas layanan kepada customer.',
    qualifications:['Memiliki komunikasi yang baik','Bertanggung jawab dan disiplin','Siap bekerja secara operasional'],
    active:true
  },
  {
    id:'packing',
    title:'Tim Packing',
    location:'Jakarta',
    type:'Full Time',
    summary:'Menyiapkan pesanan sesuai standar packing sebelum diserahkan ke Kurir/Driver.',
    description:'Melakukan receive, check, scan, pack, verify, dan handover sesuai standar operasional.',
    qualifications:['Teliti dan rapi','Mampu bekerja dalam tim','Bertanggung jawab terhadap ketepatan pesanan'],
    active:true
  },
  {
    id:'korlap',
    title:'Korlap',
    location:'Jakarta',
    type:'Full Time',
    summary:'Mengontrol dan memonitor operasional delivery agar berjalan sesuai standar.',
    description:'Melakukan control, monitoring, koordinasi, dan action terhadap kebutuhan operasional.',
    qualifications:['Memiliki kemampuan koordinasi','Komunikatif dan responsif','Mampu bekerja dengan target'],
    active:true
  }
];

// Assessment berbeda berdasarkan posisi yang dipilih kandidat.
const recruitmentTests = {
  kurir: {
    multipleChoice: [
      {question:'Sebelum berangkat delivery, hal yang paling tepat dilakukan adalah?',options:['Langsung berangkat agar cepat','Memastikan pesanan, alamat, perlengkapan, dan kendaraan siap','Menunggu customer menghubungi','Mengecek hanya kendaraan'],answer:1},
      {question:'Jika menemukan kondisi paket tidak sesuai sebelum berangkat, apa tindakan yang tepat?',options:['Tetap dibawa agar tidak terlambat','Mengubah label sendiri','Menghentikan proses dan melaporkan kepada pihak terkait','Menyembunyikan masalah'],answer:2},
      {question:'Saat tiba di lokasi customer tetapi alamat sulit ditemukan, sebaiknya?',options:['Meninggalkan lokasi','Mencoba mencari tanpa memberi kabar','Menghubungi customer atau pihak terkait dengan sopan untuk konfirmasi lokasi','Menandai pesanan selesai'],answer:2},
      {question:'Saat menyerahkan pesanan kepada customer, sikap yang paling sesuai adalah?',options:['Meletakkan pesanan lalu pergi','Menyerahkan dengan sopan dan memastikan pesanan diterima dengan benar','Meminta customer mengambil sendiri tanpa komunikasi','Menunggu customer menebak siapa kurirnya'],answer:1},
      {question:'Jika customer menyampaikan komplain saat menerima pesanan, apa yang sebaiknya dilakukan terlebih dahulu?',options:['Membantah customer','Mendengarkan dengan sopan dan mencatat masalahnya','Langsung menyalahkan packing','Pergi agar tidak terjadi masalah'],answer:1},
      {question:'Mengapa ketepatan waktu penting dalam pekerjaan kurir?',options:['Agar perjalanan terasa lebih cepat','Karena waktu delivery memengaruhi pengalaman customer dan operasional','Agar kurir bisa pulang lebih cepat','Supaya tidak perlu melakukan pengecekan'],answer:1},
      {question:'Jika terjadi kendala di perjalanan yang berpotensi membuat pesanan terlambat, apa tindakan yang tepat?',options:['Diam sampai customer bertanya','Segera komunikasikan kendala kepada pihak terkait sesuai prosedur','Menyelesaikan sendiri tanpa informasi','Membatalkan pesanan sendiri'],answer:1},
      {question:'Apa yang perlu dijaga selama membawa makanan dalam perjalanan?',options:['Posisi dan kondisi pesanan agar tetap aman dan tidak rusak','Kecepatan kendaraan saja','Agar semua pesanan ditumpuk','Agar tas delivery selalu terbuka'],answer:0},
      {question:'Jika customer tidak dapat dihubungi saat sudah tiba di lokasi, tindakan yang paling tepat adalah?',options:['Langsung meninggalkan pesanan','Mengikuti prosedur kontak dan menunggu sesuai ketentuan','Menyerahkan kepada orang acak','Menandai selesai tanpa konfirmasi'],answer:1},
      {question:'Dalam menjalankan delivery, prinsip layanan yang paling tepat adalah?',options:['Cepat tanpa peduli proses','Sopan, tepat, aman, dan mengikuti standar','Mengutamakan kecepatan di atas keamanan','Menghindari komunikasi dengan customer'],answer:1}
    ],
    essay: [
      'Ceritakan pengalaman kamu yang paling relevan dengan pekerjaan kurir atau pekerjaan lapangan.',
      'Apa yang akan kamu lakukan jika pesanan berpotensi terlambat karena kendala di perjalanan?',
      'Bagaimana cara kamu menghadapi customer yang menyampaikan komplain dengan nada tinggi?',
      'Menurut kamu, apa arti aman, tepat, dan sopan dalam pekerjaan kurir?',
      'Ceritakan contoh ketika kamu harus bertanggung jawab atas suatu pekerjaan sampai selesai.'
    ]
  },

  packing: {
    multipleChoice: [
      {question:'Saat menerima box dari area plating, apa yang perlu dilakukan terlebih dahulu?',options:['Langsung memasukkan ke area handover','Memastikan jumlah dan kondisi box sesuai','Membuka semua makanan','Mengubah label box'],answer:1},
      {question:'Mengapa kondisi box perlu diperiksa sebelum proses packing?',options:['Agar box terlihat lebih bagus','Untuk memastikan box layak dan sesuai sebelum dilanjutkan ke proses berikutnya','Supaya pekerjaan lebih lama','Karena semua box harus dibuka'],answer:1},
      {question:'Jika jumlah box yang diterima tidak sesuai dengan data atau kebutuhan, apa yang tepat dilakukan?',options:['Mengabaikan selisih','Menebak jumlah yang benar','Melakukan pengecekan ulang dan melaporkan ketidaksesuaian','Langsung menyerahkan ke kurir'],answer:2},
      {question:'Apa fungsi scan setiap box dalam proses packing?',options:['Sebagai kontrol serah terima dan pencatatan box','Untuk mengganti label','Untuk mempercepat tanpa pengecekan','Hanya untuk dokumentasi foto'],answer:0},
      {question:'Jika label box tidak sesuai dengan pesanan, apa yang sebaiknya dilakukan?',options:['Mengganti label sendiri tanpa pengecekan','Mengabaikan karena isi makanan sudah ada','Hentikan proses pada box tersebut dan ikuti prosedur penanganan ketidaksesuaian','Serahkan ke kurir agar diperbaiki'],answer:2},
      {question:'Apa tujuan utama proses packing sebelum box diserahkan kepada Kurir/Driver?',options:['Membuat box terlihat penuh','Memastikan box lengkap, sesuai standar, dan siap diserahkan','Mengurangi jumlah box','Menghindari proses scan'],answer:1},
      {question:'Jika menemukan box rusak saat proses packing, tindakan yang tepat adalah?',options:['Tetap digunakan agar cepat selesai','Menyembunyikannya','Pisahkan dan laporkan sesuai prosedur untuk ditindaklanjuti','Langsung buang tanpa informasi'],answer:2},
      {question:'Saat proses handover kepada Kurir/Driver, apa yang perlu dipastikan?',options:['Box diserahkan tanpa pengecekan','Jumlah dan kondisi box sesuai serta proses serah terima terkontrol','Kurir mengambil sendiri tanpa informasi','Hanya melihat nama kurir'],answer:1},
      {question:'Mengapa ketelitian penting bagi Tim Packing?',options:['Karena kesalahan packing dapat berdampak pada proses delivery dan customer','Agar pekerjaan terlihat rumit','Supaya tidak perlu komunikasi','Karena packing tidak membutuhkan kecepatan'],answer:0},
      {question:'Jika ada ketidaksesuaian box atau label, prinsip tindakan yang paling tepat adalah?',options:['Cepat menyelesaikan dengan cara sendiri','Ikuti prosedur, cek ulang, dan komunikasikan kepada pihak terkait','Diam agar target tercapai','Serahkan masalah kepada kurir'],answer:1}
    ],
    essay: [
      'Ceritakan pengalaman kamu yang menunjukkan ketelitian dalam bekerja.',
      'Apa langkah yang akan kamu lakukan jika jumlah box yang diterima tidak sesuai?',
      'Bagaimana kamu menangani box atau label yang tidak sesuai sebelum handover?',
      'Menurut kamu, mengapa proses scan penting dalam serah terima box?',
      'Ceritakan pengalaman bekerja dalam tim ketika kamu harus menjaga ketepatan pekerjaan.'
    ]
  },

  korlap: {
    multipleChoice: [
      {question:'Apa fokus utama seorang Korlap dalam operasional delivery?',options:['Hanya menyelesaikan pekerjaan sendiri','Control, monitor, koordinasi, dan action terhadap operasional','Hanya membuat laporan akhir bulan','Menggantikan seluruh pekerjaan kurir'],answer:1},
      {question:'Jika menemukan kendala operasional yang dapat memengaruhi delivery, apa tindakan awal yang tepat?',options:['Mengabaikannya','Mengumpulkan informasi dan melakukan koordinasi untuk menentukan tindakan','Menunggu masalah membesar','Langsung menyalahkan tim'],answer:1},
      {question:'Mengapa monitoring operasional perlu dilakukan secara rutin?',options:['Agar semua orang merasa diawasi','Untuk mengetahui kondisi aktual dan menangani potensi masalah lebih awal','Supaya pekerjaan lebih lambat','Agar laporan terlihat banyak'],answer:1},
      {question:'Jika ada informasi dari tim yang belum jelas, Korlap sebaiknya?',options:['Membuat asumsi sendiri','Meminta klarifikasi dan memastikan informasi sebelum mengambil tindakan','Mengabaikannya','Meneruskan informasi tanpa pengecekan'],answer:1},
      {question:'Saat terjadi masalah antara dua anggota tim, sikap Korlap yang tepat adalah?',options:['Memihak tanpa mencari informasi','Mendengarkan informasi dari pihak terkait dan mencari penyelesaian sesuai kebutuhan operasional','Membiarkan konflik','Menyalahkan salah satu pihak di depan tim'],answer:1},
      {question:'Jika target operasional belum tercapai, langkah yang paling tepat adalah?',options:['Menunggu sampai selesai sendiri','Identifikasi penyebab, koordinasikan tindakan, dan monitor hasilnya','Mengubah data agar terlihat tercapai','Mengabaikan target'],answer:1},
      {question:'Apa manfaat komunikasi yang jelas dalam koordinasi operasional?',options:['Mengurangi kebutuhan informasi','Membantu setiap pihak memahami kondisi, tugas, dan tindakan yang harus dilakukan','Membuat semua keputusan hanya dari Korlap','Menghindari tanggung jawab'],answer:1},
      {question:'Ketika masalah sudah ditangani, apa yang sebaiknya dilakukan Korlap?',options:['Menganggap selesai tanpa pengecekan','Memastikan tindakan berjalan dan hasilnya sesuai kebutuhan','Langsung pindah ke masalah lain','Menghapus informasi masalah'],answer:1},
      {question:'Dalam mengambil keputusan operasional, informasi apa yang paling penting?',options:['Asumsi pribadi','Data dan kondisi aktual yang relevan','Pendapat satu orang saja','Informasi lama tanpa pengecekan'],answer:1},
      {question:'Jika tim membutuhkan bantuan untuk menyelesaikan kendala, peran Korlap yang tepat adalah?',options:['Menghindari masalah','Mengarahkan, mengoordinasikan, dan memastikan action berjalan','Menyuruh tim mencari solusi sendiri tanpa arahan','Menunggu laporan akhir'],answer:1}
    ],
    essay: [
      'Ceritakan pengalaman kamu dalam mengoordinasikan tim atau pekerjaan operasional.',
      'Apa langkah kamu ketika menemukan masalah yang berpotensi mengganggu delivery?',
      'Bagaimana cara kamu memastikan instruksi kepada tim dipahami dengan jelas?',
      'Ceritakan pengalaman ketika kamu harus mengambil tindakan berdasarkan kondisi aktual di lapangan.',
      'Menurut kamu, apa yang membuat seorang pemimpin operasional dapat dipercaya oleh timnya?'
    ]
  }
};
