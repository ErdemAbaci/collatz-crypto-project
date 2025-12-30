    ALGORİTMA: Collatz_Tabanlı_Sifreleme
GİRDİLER:  Düz_Metin (String), Tohum (Tamsayı)
ÇIKTI:     Sifreli_Veri (Binary String)

BAŞLA
    1. Düz_Metin'i Binary formatına çevir -> Mesaj_Bitleri
    2. Gerekli_Uzunluk = Mesaj_Bitleri.Uzunluk
    3. Anahtar = "" (Boş String)
    4. Sayı = Tohum

    DÖNGÜ (Anahtar.Uzunluk < Gerekli_Uzunluk):
        EĞER Sayı ÇİFT İSE:
            Anahtar'a "0" ekle
            Sayı = Sayı / 2
        DEĞİLSE (TEK İSE):
            Anahtar'a "1" ekle
            Sayı = (3 * Sayı) + 1
        
        EĞER Sayı == 1 İSE:
            Sayı = Tohum + Anahtar.Uzunluk (Döngüyü kırmak için)
    DÖNGÜ SONU

    5. Sifreli_Veri = ""
    DÖNGÜ (i = 0'dan Gerekli_Uzunluk'a kadar):
        Bit_M = Mesaj_Bitleri[i]
        Bit_K = Anahtar[i]
        
        EĞER Bit_M == Bit_K İSE:
            Sifreli_Veri'ye "0" ekle
        DEĞİLSE:
            Sifreli_Veri'ye "1" ekle
    DÖNGÜ SONU

    DÖNDÜR Sifreli_Veri
BİTİŞ