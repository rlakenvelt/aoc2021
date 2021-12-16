import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 16A: Packet Decoder'
const input = new InputHelper();
const logger = new Logger(puzzle);

const transmission: string = input.getInput()[0];

logger.start();

const binaryTransmission = transmission.split('').map(c=> hex2bin(c)).join('').split('');

let answer = parsePacket()[0];

logger.end(answer);

function parsePacket(): number[] {

    const version = getByte(3);
    const typeID  = getByte(3);
    let values: number[] = [];
    let value = 0;
    switch (typeID) {
        case 4:
            let literal = '';
            do {
                let packet = getBits(5);
                const value = packet.slice(1).join('');
                literal+=value;
                if (packet[0] === 0) break;
            } while (true);
            values.push(parseInt(literal, 2));
            break;
                
        default:
            const lengthTypeID = getBits(1)[0];

            if (lengthTypeID===0) {
                const length = getByte(15);
                const currentLength = binaryTransmission.length;
                do {
                    values.push(...parsePacket());
                } while (currentLength - binaryTransmission.length < length)

            } else {
                const length = getByte(11);
                for (let count=0; count<length; count++) {
                    values.push(...parsePacket());
                }
            }
            break;
    }  
    switch (typeID) {
        case 0: //SUM
            value = values.reduce((total, v) => {
                return total+=v;
            }, 0);
            values=[value];
            break;
        case 1: //PRODUCT
            value = values.reduce((total, v) => {
                return total*=v;
            }, 1);
            values=[value];
            break;    
        case 2: //MINIMUM
            value = values.reduce((total, v) => {
                return Math.min(total, v);
            }, Number.MAX_SAFE_INTEGER);
            values=[value];
            break;
        case 3: //MAXIMUM
            value = values.reduce((total, v) => {
                return Math.max(total, v);
            }, 0);
            values=[value];
            break;
        case 5: //GREATER
            value = (values[0]>values[1]?1:0);
            values=[value];
            break;
        case 6: //LESS
            value = (values[0]<values[1]?1:0);
            values=[value];
            break;
        case 7: //EQUAL
            value = (values[0]===values[1]?1:0);
            values=[value];
            break;
    }
    return values; 
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

