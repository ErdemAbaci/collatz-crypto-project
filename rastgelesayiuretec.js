/**
 * KONU: Dengelenmiş Collatz RSÜ (Von Neumann Extractor)
 * DERS: Bilgi Sistemleri ve Güvenliği
 */

function generateBalancedBits(seed, n) {
    let current = BigInt(seed);
    let finalBits = [];
    
    // Von Neumann Extractor: Çiftler halindeki bitleri karşılaştırır
    while (finalBits.length < n) {
        let bitPair = [];
        
        // İki adet ham bit üret
        while (bitPair.length < 2) {
            let rawBit = (current % 2n === 0n) ? 0 : 1;
            bitPair.push(rawBit);
            
            // Collatz ilerlemesi
            if (current % 2n === 0n) {
                current = current / 2n;
            } else {
                current = (current * 3n) + 1n;
            }
            
            if (current === 1n) {
                current = BigInt(seed) + BigInt(finalBits.length) + BigInt(Date.now());
            }
        }

        // Beyazlatma kuralı:
        // 01 -> 0 üret
        // 10 -> 1 üret
        // 00 veya 11 -> Atla (tekrar dene)
        if (bitPair[0] === 0 && bitPair[1] === 1) {
            finalBits.push(0);
        } else if (bitPair[0] === 1 && bitPair[1] === 0) {
            finalBits.push(1);
        }
    }
    return finalBits;
}

function runTests(bits) {
    const n = bits.length;
    const count1 = bits.filter(x => x === 1).length;
    const count0 = n - count1;
    const expected = n / 2;
    const chiSquare = (Math.pow(count0 - expected, 2) / expected) + 
                      (Math.pow(count1 - expected, 2) / expected);

    console.log("=== İSTATİSTİKSEL TEST SONUÇLARI ===");
    console.log(`Toplam Bit: ${n}`);
    console.log(`0 Sayısı: ${count0} (%${((count0/n)*100).toFixed(2)})`);
    console.log(`1 Sayısı: ${count1} (%${((count1/n)*100).toFixed(2)})`);
    console.log(`Kikare Değeri: ${chiSquare.toFixed(4)}`);
    console.log(`Sonuç: ${chiSquare < 3.84 ? "GEÇTİ (Rastgele)" : "KALDI"}`);
}

// Ana Akış
const bits = generateBalancedBits(123456789, 10000);
runTests(bits);