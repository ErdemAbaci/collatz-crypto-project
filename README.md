# Collatz Conjecture Based PRNG with Von Neumann Whitening

Bu proje, **Bilgi Sistemleri ve Güvenliği** dersi final ödevi kapsamında geliştirilmiştir. Collatz Sanısı'nın (3n+1 problemi) kaotik yapısı kullanılarak, istatistiksel olarak güvenilir bir **Rastgele Sayı Üreteci (RSÜ)** tasarlanmış ve **Kikare (Chi-Square)** testi ile doğrulanmıştır.

## 🧐 Problem ve Çözüm Yaklaşımı

### İlk Sorun (Bias):
Collatz algoritması ham haliyle kullanıldığında, tek sayılardan sonra her zaman çift sayı gelmesi ($3n+1 = \text{Çift}$) nedeniyle `0` bitleri lehine bir yanlılık (bias) oluşmaktadır (%67 sıfır, %33 bir). Bu durum, algoritmanın rastgelelik testlerinden (Kikare) kalmasına neden olur.

### Çözümü (Whitening):
Algoritmadaki bu yanlılığı gidermek için **Von Neumann Extractor (Whitening)** tekniği uygulanmıştır. Bitler çiftler halinde incelenerek:
- `01` çiftinden `0` biti üretilir.
- `10` çiftinden `1` biti üretilir.
- `00` ve `11` gibi birbirini takip eden benzer bitler elenir.

Bu yöntemle, Collatz dizisindeki korelasyon koparılmış ve **%50-%50 dengesi** (İstatistiksel Kalite) sağlanmıştır.



## 🛠️ Teknik Özellikler
- **Dil:** Node.js (JavaScript)
- **Algoritma:** Collatz Conjecture (3n+1)
- **Güvenlik Katmanı:** Von Neumann Randomness Extractor
- **Test Metodolojisi:** Chi-Square (Kikare) Statistical Test
- **Kriptoanaliz:** XOR Tabanlı Stream Cipher Simülasyonu

## 📈 İstatistiksel Test Sonuçları
Yapılan 10.000 bitlik örneklem testlerinde şu sonuçlar elde edilmiştir:

| Parametre | Değer |
| :--- | :--- |
| Toplam Bit | 10,000 |
| 0 Sayısı | 4,982 (%49.82) |
| 1 Sayısı | 5,018 (%50.18) |
| **Kikare Değeri** | **1.2996** |
| **Sonuç** | **BAŞARILI (Geçti)** |

*Not: Serbestlik derecesi 1 ve %95 güven aralığı için kritik değer **3.84**'tür. Elde edilen değer bu sınırın altında olduğundan algoritma istatistiksel olarak rastgele kabul edilir.*

## 🚀 Kurulum ve Çalıştırma

1. Repoyu klonlayın:
   ```bash
   git clone [https://github.com/ErdemAbaci/collatz-crypto-project.git](https://github.com/ErdemAbaci/collatz-crypto-project.git)