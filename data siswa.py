# sistem manajemen nilai siswa - versi lanjutan

data_siswa = []

#validasi input angka

def input_angka(pesan):
    while True:
        try:
            return int(input(pesan))
        except:
            print("input harus berupa angka! COBA LAGI.")
            
#HITUNG RATA RATA

def hitung_rata(nilai):
    return sum(nilai) / len(nilai)

#tentukan predikat dan status

def tentukan_predikat(rata):
    if rata >= 90:
        return "A"
    elif rata >= 80:
        return "B"
    elif rata >= 75:
        return "C"
    else:
        return "D"
    
def tentukan_status(rata):
    return "LULUS" if rata >=75 else "TIDAK LULUS"

#input data siswa

def tambah_siswa():
    print("\n=== INPUT DATA SISWA ===")
    nama = input("nama: ")
    umur = input_angka("umur: ")
    kelas = input("kelas: ")
    
    nilai = []
    jumlah = input_angka("Berapa jumlah nilai?")
    
    for i in range(jumlah):
        n = input_angka(f"Nilai ke-{i+1}: ")
        nilai.append(n)
        
    rata = hitung_rata(nilai)
    
    siswa = {
        "nama": nama,
        "umuru": umur,
        "kelas": kelas,
        "nilai": nilai,
        "rata": rata,
        "predikat": tentukan_predikat(rata),
        "status": tentukan_status(rata)
    }
    
    data_siswa.append(siswa)
    print("Data Berhasil ditambahkan")
    
    #tampilan data
    
def tampilan_data():
        if not data_siswa:
            print("Belum ada data.")
            return
        
        for i, siswa in enumerate(data_siswa, start=1):
            print(f"\ndata ke-{i}")
            print("nama     :", siswa["nama"])
            print("umur     :", siswa["umur"])
            print("kelas    :", siswa["kelas"])
            print("nilai    :", siswa["nilai"])
            print("rata     :", siswa["rata"])
            print("predikat :", siswa["predikat"])
            print("status   :", siswa["status"])
            
#cari siswa

def cari_siswa():
    nama_cari = input("masukan nama siswa yang dicari: ")
    for siswa in data_siswa:
        if siswa["nama"].lower() == nama_cari.lower:
            print("Data ditemukan:")
            print(siswa)
            return
            print("Data tidak ditemukan.")
            
            #hapus siswa
def hapus_siswa():
    nama_hapus = input ("masukan nama siswa yang akan dihapus: ")
    for siswa in data_siswa:
        if siswa["nama"].lower() == nama_hapus.lower():
            data_siswa.remove(siswa)
            print("data berhasil dihapus.")
            return
    print("data tidak ditemukan.")
    
#nilai tertinggi dan terendah

def nilai_ekstrem():
    if not data_siswa:
        print("belum ada data.")
        return
    
    tertinggi = max(data_siswa, key=lambda x: x["rata"])
    terendah = min(data_siswa, key=lambda x: x["rata"])
    print("nilai tertinggi :", tertinggi["nama"], "-", tertinggi["rata"])
    print("nilai terendah   :", terendah["nama"], "-", terendah["rata"])
    
#simpan ke file
def simpan_file():
    with open("data_siswa.txt", "w") as file:
        for siswa in data_siswa:
            file.write(str(siswa) + "\n")
            print("data berhasil disimpan kefile data_siswa.txt")
            
#menu utama

while True:
    print("\n=== menu utama ===")
    print("1. tambah data siswa")
    print("2. tampilkan semua data")
    print("3. cari siswa")
    print("4. hapus siswa")
    print("5. nilai tertinggi dan terendah")
    print("6. simpan ke file")
    print("7. keluar")
    
    pilih = input("pilih menu (1-7): ")
    if pilih == "1":
        tambah_siswa()
    elif pilih == "2":
        tampilan_data()
    elif pilih == "3":
        cari_siswa == "1"
            
    elif pilih == "4":
        hapus_siswa()
    elif pilih == "5":
        nilai_ekstrem()
    elif pilih == "6":
        simpan_file()
    elif pilih == "7":
        print("program selesai.")
        break
    else:
        print("pilihan tidak valid")