total_harga = 0

while True:
    print("\n=== PROGRAM KASIR SEDERHANA ===")
    print("1. beli makanan")
    print("2. beli minuman")
    print("3. keluar")

    pilihan = input("pilih menu (1/2/3):")

    if pilihan == "1" :
        print("\n === MENU MAKANAN ===")
        print("1. Nasi Goreng : Rp15.000")
        print("2. Mie Ayam    : Rp12.000")

        Menu_Makan = input("pilih makanan (1/2):")
        jumlah = int(input("Masukkan jumlah Pesanan"))

        if Menu_Makan == "1":
            total = 15000 * jumlah
            total_harga += total
            print("Total harga Mie Ayam Rp", total)

        elif Menu_Makan == "2":
             total = 12000 * jumlah
             total_harga += total
             print("Total harga Mie Ayam: Rp", total)

        else:
             print("Pilihan Makanan Tidak Tersedia")

    elif pilihan == "2":
        print("\n--- MENU MINUMAN ---")
        print("1. Es Teh    : Rp5.000")
        print("2. Es Jeruk  : Rp7.000")

        Menu_Minum = input("Pilih minuman (1/2):")
        jumlah = int(input("Masukkan Jumlah Pesanan :"))

        if Menu_Makan == "1":
            total = 5000 * jumlah
            total_harga += total
            print("Total Harga Es Teh:Rp", total)

        elif Menu_Minum == "2":
            total = 7000 * jumlah
            total_harga += total
            print("Total Harga Es Jeruk:Rp", total)

        else:
            print("Pilihan Minuman Tidak Tersedia")

    elif pilihan == "3":
        print("\n=== STRUK BELANJA ===")
        print("Total yang harus dibayar :Rp",total_harga)

        if total_harga > 50000:
            diskon = total_harga * 0.1
            total_harga -= diskon
            print("diskon 10%: Rp",int(diskon))
            print("Total Setelah Diskon:Rp",int(total_harga))

            print("Terima Kasih Telah Berbelanja")
            break

    else:
        print("menu tidak valid,silahkan Pilih lagi")
