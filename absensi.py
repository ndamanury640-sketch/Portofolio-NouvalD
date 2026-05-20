# Program Absensi Siswa

hadir = 0
izin = 0
alfa = 0

jumlah_siswa = int(input("Masukkan jumlah siswa: "))

for i in range(jumlah_siswa):
    print(f"\nSiswa ke-{i+1}")
    nama = input("Masukkan nama siswa: ")
    status = input("Masukkan status (hadir/izin/alfa): ").lower()

    # Percabangan if, elif, else
    if status == "hadir":
        hadir += 1
    elif status == "izin":
        izin += 1
    elif status == "alfa":
        alfa += 1
    else:
        print("Status tidak valid, tidak dihitung")

print("\n=== REKAP ABSENSI SISWA ===")
print("Jumlah Hadir :", hadir)
print("Jumlah Izin  :", izin)
print("Jumlah Alfa  :", alfa)