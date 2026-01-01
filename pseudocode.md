ALGORİTMA: Dengelenmiş Collatz Rastgele Sayı Üreteci (RSÜ)

GİRDİ: 
  S (Tohum Sayısı / Seed)
  N (Üretilecek Hedef Bit Sayısı)

ÇIKTI:
  B (İstatistiksel Olarak Dengeli Rastgele Bit Dizisi)

BAŞLA
  1.  B listesini boş olarak tanımla.
  2.  Güncel_Sayı = S
  
  3.  DÖNGÜ (B listesinin uzunluğu < N olduğu sürece):
      a.  Ham_Bit_Çifti listesini boşalt.
      
      b.  İÇ DÖNGÜ (Ham_Bit_Çifti uzunluğu < 2 olduğu sürece):
          i.  EĞER (Güncel_Sayı çift) İSE: 
                Ham_Bit = 0, Güncel_Sayı = Güncel_Sayı / 2
              DEĞİLSE (Güncel_Sayı tek): 
                Ham_Bit = 1, Güncel_Sayı = (Güncel_Sayı * 3) + 1
          
          ii. Ham_Bit'i Ham_Bit_Çifti'ne ekle.
          
          iii. EĞER (Güncel_Sayı == 1) İSE:
                 // 4-2-1 döngüsünü kırmak için tohumu o anki duruma göre güncelle
                 Güncel_Sayı = S + B.uzunluk + Sistem_Saati()
      İÇ DÖNGÜ SONU

      c.  BEYAZLATMA (Von Neumann Extractor):
          i.   EĞER (Ham_Bit_Çifti == [0, 1]) İSE: B listesine 0 ekle.
          ii.  EĞER (Ham_Bit_Çifti == [1, 0]) İSE: B listesine 1 ekle.
          iii. EĞER (Ham_Bit_Çifti == [0, 0] VEYA [1, 1]) İSE: Bitleri at (Yeniden dene).
  DÖNGÜ SONU

  4.  İSTATİSTİKSEL ANALİZ:
      a.  Kikare (Chi-Square) değerini hesapla: Σ (Gözlemlenen - Beklenen)² / Beklenen
      b.  EĞER (Kikare < 3.84) İSE: "Rastgelelik Testi Başarılı" sonucunu döndür.

  5.  B dizisini geri döndür.
BİTİŞ