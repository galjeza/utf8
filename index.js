
const validate = (input) => {
    if(input === "FF" || input === "FE") {
        return false;
    }
    return true;
}

const odstraniNicle = (bytes) => {
    let result = "";
    bytes.substr(0,3) === "110"  && (result=bytes.substr(3, 5) + bytes.substr(10, 6))
    bytes.substr(0,4) === "1110" && (result=bytes.substr(4, 4) + bytes.substr(10, 6) + bytes.substr(18, 6))
    bytes.substr(0,5) === "11110" && (result=bytes.substr(5, 3) + bytes.substr(10, 6) + bytes.substr(18, 6) + bytes.substr(26, 6))
    bytes.substr(0,1) === "0" && (result=bytes.substr(1, 7))
    return result;
}

const decode = (input) => {
    let bytes = parseInt(input, 16).toString(2);
    bytes = odstraniNicle(bytes);
    console.log("Po odstranitvi režijskih bitov :", bytes);
    const hex = parseInt(bytes, 2).toString(16); // pretvorba v hexadecimalno zaporedje
    return hex.toUpperCase();
}

const encode = (input) => {
    let bytes = "";
    bytes = parseInt(input, 16).toString(2);
    console.log("Po binarni pretvorbi :", bytes);
    bytes = bytes.replace(/^0+/, ''); // Odstranitev vodilnih ničel
    if(bytes.length < 8 ) {
        bytes = "0".repeat(8 - bytes.length) + bytes; // Dodajanje vodilnih ničel
    }else if(bytes.length <=11) {
        bytes = "0".repeat(11 - bytes.length) + bytes;
       bytes = "110" + bytes.substr(0, 5) + "10" + bytes.substr(5, 6);
    }else if(bytes.length <=16) {
        bytes = "0".repeat(16 - bytes.length) + bytes;
        bytes = "1110" + bytes.substr(0, 4) + "10" + bytes.substr(4, 6) + "10" + bytes.substr(10, 6);
    }else if(bytes.length <=21) {
        bytes = "0".repeat(21 - bytes.length) + bytes;
        bytes = "11110" + bytes.substr(0, 3) + "10" + bytes.substr(3, 6) + "10" + bytes.substr(9, 6) + "10" + bytes.substr(15, 6);
    }else{
        return "Napaka več kot 4 bajtno kodiranje";
    }
    console.log("Z dodanimi režijskimi biti :", bytes);
    const hex = parseInt(bytes, 2).toString(16); // pretvorba v hexadecimalno zaporedje
    return hex.toUpperCase();
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
    })

readline.question('Vnesite znak za kodiranje(heksadecimalno): ', (input) => {
    if(validate(input)) {
        console.log(`V UTF-8 zakodiran znak tvori bajte: ${encode(input)}`);
    }else{
        console.log("Napaka, neveljavna vrednost");
    }
    readline.question('Vnesi znak za dekodiranje(heksadecimalno) : ', (input) => {
        console.log(`Iz UTF-8 odkodiran znak je: ${decode(input)}`);
        readline.close();
    });
});

