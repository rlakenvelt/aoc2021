import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 16A: Packet Decoder'
const input = new InputHelper();
const logger = new Logger(puzzle);

const transmission: string = input.getInput()[0];

logger.start();

const binaryTransmission = transmission.split('').map(c=> hex2bin(c)).join('').split('');
let versions = 0;
parsePacket();


let answer = versions;;



logger.end(answer);

function parsePacket() {

    const version = getByte(3);
    versions+=version;


    do  {
        const typeID  = getByte(3);
        console.log('VERSION', version, 'TYPE', typeID, 'PACKETS', binaryTransmission);
        switch (typeID) {
            case 4:
                console.log('EXAMIN LITERAL VALUE');
                let literal = '';
                do {
                    let packet = getBits(5);
                    const value = packet.slice(1).join('');
                    literal+=value;
                    if (packet[0] === 0) break;
                } while (true);
                console.log('VALUE=', parseInt(literal, 2), binaryTransmission);
                break;
                    
            default:
                console.log('EXAMIN OPERATOR');

                const lengthTypeID = getBits(1)[0];

                if (lengthTypeID===0) {

                    const length = getByte(15);
                    console.log('LENGTH', length, 'BITS', binaryTransmission.length, binaryTransmission.join(''));
                    const currentLength = binaryTransmission.length;
                    do {
                        parsePacket();
                        console.log('AFTER parse', binaryTransmission.length, binaryTransmission.join(''));
                    } while (currentLength - binaryTransmission.length < length)

                } else {
                    const length = getByte(11);
                    console.log('LENGTH', length, 'PACKAGES', binaryTransmission);
                    for (let count=0; count<length; count++) {
                        parsePacket();
                        console.log('AFTER parse', binaryTransmission.length, binaryTransmission.join(''));
                    }

                }
                break;
        }    
        break;
    } while (true);
}

function hex2bin(hex: string){
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');
}

function getByte(bits: number){
    return parseInt(binaryTransmission.splice(0, bits).join(''), 2);
}

function getBits(bits: number){
    return binaryTransmission.splice(0, bits).map(x=>parseInt(x));
}

