while True:
    # input rata siswa 
    nama =input ("masukan nama siswa(ketik 'exit' untuk keluar):")
    if nama.lower()== "exit":
        break

    nilai_tugas = float(input("Masukkan nilai tugas :"))
    nilai_uts= float(input("Masukkan nilai uts :"))
    nilai_uas= float(input("Masukan nilai uas :"))

    #Hitung nilai rata rata
    rata_rata=(nilai_tugas + nilai_uts + nilai_uas)/3

    #menentukan predikat dan status
    if rata_rata>= 85:
        predikat="A"
        status="LULUS"
    elif rata_rata>= 75:
        predikat="B"
        status="LULUS"
    elif rata_rata>= 65:
        predikat="C"
        status="REMEDIAL"
    else:
        predikat="D"
        status="TIDAK LULUS"

#output hasil(FORMAT TIDAK DIUBAH)
    print("\n== HASIL PENILAIAN SISWA==")
    print(f"Nama siswa      :{nama}")
    print(f"Nilai tugas     :{nilai_tugas}")
    print(f"Nilai uts       :{nilai_uts}")
    print(f"Nilai uas       :{nilai_uas}")
    print(f"Nilai rata-rata :{rata_rata:.2f}")
    print(f"predikat        :{predikat}")
    print(f"Status          :{status}")