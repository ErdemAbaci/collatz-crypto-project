// --- BİLGİ SİSTEMLERİ VE GÜVENLİĞİ ---
// Konu: Collatz Sanısı (3n+1) Tabanlı PRNG ve Akış Şifreleme

const crypto = require('crypto'); // Sadece karşılaştırma veya buffer işlemleri için (Opsiyonel)

/**
 * Collatz Algoritması ile Rastgele Bit Üreteci (PRNG)
 * @param {BigInt} seed - Başlangıç tohum değeri (Gizli Anahtar)
 * @param {number} length - İstenen bit uzunluğu
 * @returns {string} - '10101...' şeklinde binary string
 */
function collatzGenerator(seed, length) {
    let current = BigInt(seed);
    let binaryKey = "";

    // İstenen uzunluğa gelene kadar döngü
    while (binaryKey.length < length) {
        // LSB (Least Significant Bit) yöntemi:
        // Sayı çiftse '0', tekse '1' ekle.
        if (current % 2n === 0n) {
            binaryKey += "0";
            current = current / 2n;
        } else {
            binaryKey += "1";
            current = (current * 3n) + 1n;
        }

        // Collatz döngüsü (4-2-1) kontrolü
        // Eğer 1'e ulaşırsa, deterministik döngüden çıkmak için yeniden tohumlama yapıyoruz.
        if (current === 1n) {
            // Basit bir yeniden besleme (re-seed) mekanizması
            current = BigInt(seed) + BigInt(binaryKey.length) + 12345n;
        }
    }

    return binaryKey;
}

/**
 * Yardımcı Fonksiyon: Metni Binary String'e Çevirir
 */
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

/**
 * Yardımcı Fonksiyon: Binary String'i Metne Çevirir
 */
function binaryToText(binary) {
    let text = "";
    for (let i = 0; i < binary.length; i += 8) {
        let byte = binary.substr(i, 8);
        text += String.fromCharCode(parseInt(byte, 2));
    }
    return text;
}

/**
 * XOR Şifreleme/Deşifreleme Fonksiyonu
 * (Simetrik işlem olduğu için ikisi için de kullanılır)
 */
function xorProcess(binaryData, binaryKey) {
    let result = "";
    for (let i = 0; i < binaryData.length; i++) {
        // XOR Mantığı: Bitler aynıysa '0', farklıysa '1'
        result += (binaryData[i] === binaryKey[i]) ? "0" : "1";
    }
    return result;
}

// --- ANA PROGRAM AKIŞI ---

// 1. GİRDİLER
const plaintext = "Bilgi Guvenligi Odevim"; 
const secretSeed = 987654321; // Bu sayı değiştikçe şifre tamamen değişir.

console.log("============================================");
console.log("   COLLATZ (3n+1) KRİPTOGRAFİ SİMÜLASYONU   ");
console.log("============================================");

// 2. HAZIRLIK
const binaryPlaintext = textToBinary(plaintext);
const requiredBitLength = binaryPlaintext.length;

console.log(`\n[1] GİRDİ VERİSİ:`);
console.log(`Mesaj: "${plaintext}"`);
console.log(`Binary (${requiredBitLength} bit): ${binaryPlaintext.substring(0, 40)}... (devamı var)`);

// 3. ANAHTAR ÜRETİMİ (COLLATZ)
console.time("Anahtar Üretim Süresi");
const generatedKey = collatzGenerator(secretSeed, requiredBitLength);
console.timeEnd("Anahtar Üretim Süresi");

console.log(`\n[2] ÜRETİLEN ANAHTAR (Collatz PRNG):`);
console.log(`Seed (Tohum): ${secretSeed}`);
console.log(`Anahtar: ${generatedKey.substring(0, 40)}...`);

// 4. ŞİFRELEME (XOR)
const encryptedBinary = xorProcess(binaryPlaintext, generatedKey);
const encryptedTextHex = parseInt(encryptedBinary.substring(0, 32), 2).toString(16).toUpperCase(); // Görsel amaçlı hex özeti

console.log(`\n[3] ŞİFRELEME İŞLEMİ (Plaintext XOR Key):`);
console.log(`Şifreli Binary: ${encryptedBinary.substring(0, 40)}...`);
console.log(`(Şifreli veriyi metin olarak okumak imkansızdır, Hex Özeti: ${encryptedTextHex}...)`);

// 5. DEŞİFRELEME (XOR TEKRARI)
const decryptedBinary = xorProcess(encryptedBinary, generatedKey);
const decryptedText = binaryToText(decryptedBinary);

console.log(`\n[4] DEŞİFRELEME İŞLEMİ (Ciphertext XOR Key):`);
console.log(`Çözülen Binary: ${decryptedBinary.substring(0, 40)}...`);
console.log(`Çözülen Mesaj:  "${decryptedText}"`);

console.log("\n============================================");
console.log("              İŞLEM BAŞARILI                ");
console.log("============================================");