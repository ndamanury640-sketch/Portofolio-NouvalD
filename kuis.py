import datetime

def salam():
    print("Halo! saya asisten belajar python")
    nama = input("masukan nama kamu: ")
    print(f"selamat datang, {nama}! yuk belajar sambil kuis")
    return nama

def waktu():
    now = datetime.datetime.now()
    print("waktu :", now.strftime("%H:%M:%S"))
    
def tanggal():
    today = datetime.date.today()
    print("tanggal:", today.strftime("%d-%m-%Y"))
    
def kalkulator():
    print("\n KALKULATOR")
    a = float(input("angka pertama: "))
    b = float(input("angka kedua: "))
    
    print("1. Tambah")
    print("2. Kurang")
    print("3. Kali")
    print("4. Bagi")
    
    pilih = input("pilih operasi: ")
    
    if pilih == "1":
        print("Hasil:", a + b)
    elif pilih == "2":
        print("Hasil:", a - b)
    elif pilih == "3":
        print("Hasil:", a * b)
    elif pilih == "4":
        if b != 0:
            print("Hasil:", a / b)
        else:
            print("tidak bisa dibagi nol")
    else:
        print("pilih salah")
        
def kuis():
    print("\n kuis python dasar")
    skor = 0
    
    soal = [
        {
            "tanya": "1. apa fungsi dari print()?",
            "opsi": ["A. input data", "B. menampilkan output", "C. mengulang program", "D. Menghentikan program"],
            "jawab": "B"
        },
        {
            "tanya": "2. manakah tipe data bilangan bulat?",
            "opsi": ["A. str", "B. float", "C. int", "D. bool"],
            "jawab": "C"
        },
        {
            "tanya": "3. perintah perulangan dipython adalah?",
            "opsi": ["A. if", "B. else", "C. for", "D. def"],
            "jawab": "C"
        },
        {
            "tanya": "4. simbol untuk komentar adalah?",
            "opsi": ["A. //", "B. <!-- -->", "C. #", "D. **"],
            "jawab": "C"
        },
        {
            "tanya": "5. fungsi input() digunakan untuk?",
            "opsi": ["A. menampilkan teks", "B. mengambil data dari user", "C. menghitung angka", "D. menghapus data"],
            "jawab": "B"
        }
    ]
    
    for s in soal:
        print("\n" + s["tanya"])
        for o in s["opsi"]:
            print(o)
            
        jawab = input("jawaban (A/B/C/D): ").upper()
        if jawab == s["jawab"]:
            print("benar")
            skor += 20
        else:
            print("salah")
    
    # Penilaian skor setelah semua soal selesai
    if skor >= 80:
        print("sangat baik! kamu paham python dasar")
    elif skor >= 60:
        print("cukup baik, tetap belajar ya")
    else:
        print("jangan menyerah, ayo belajar lagi!")
            
def menu():
    print("""
    === menu asisten ===
    1. lihat waktu
    2. lihat tanggal
    3. kalkulator
    4. kuis python
    5. keluar
    """)
            
nama_user = salam()

while True:
    menu()
    pilih = input("pilih menu(1-5): ")
    
    if pilih == "1":
        waktu()
    elif pilih == "2":
        tanggal()
    elif pilih == "3":
        kalkulator()
    elif pilih == "4":
        kuis()
    elif pilih == "5":
        print(f"terima kasih {nama_user}, sampai jumpa!")
        break
    else:
        print("menu tidak tersedia")