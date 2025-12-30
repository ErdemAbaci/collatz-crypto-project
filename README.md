Collatz Conjecture Based Stream Cipher (RNG & XOR)
Bu proje, Bilgi Sistemleri ve Güvenliği dersi kapsamında geliştirilmiş, Collatz Sanısı (3n+1 problemi) temelli bir Sözde Rastgele Sayı Üreteci (PRNG) ve bu üreteçle çalışan bir XOR akış şifreleme simülasyonudur.

-ÖZELLİKLER-
Collatz PRNG: Başlangıç tohumu (seed) üzerinden tahmin edilmesi zor bit dizileri üretir.

XOR Encryption: Üretilen anahtar ile veriyi bit düzeyinde şifreler.

BigInt Desteği: JavaScript'in BigInt kütüphanesi kullanılarak çok büyük tohum değerleriyle çalışılabilir.

Re-seeding: 4-2-1 döngüsüne girmeyi engelleyen dinamik tohum güncelleme mekanizması.
