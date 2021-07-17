import { Platform, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export function textPer(percent) {
    const heightPercent = (percent * width) / 100;
    // return Math.round(heightPercent);
    return heightPercent;
}

export const font = {
    reg: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    // bold: 'Futura-Medium',
}

export const shadow = {
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
}

export const color = {
    primeColor: '#142031',
    primeColor_op_10: '#14203111',
    primeColor_op_20: '#14203122',
    primeColor_op_40: '#14203144',
    secondColor: '#aad8d3',
    orenge: '#e8910d',
    orenge_op_11: '#e8910d11',
    orenge_light: '#e67016',
    orenge_light_op_05: '#e6701605',
    lableColor: '#a2a2a2',
    iconColor: '#CECECE',
    red: '#F25961',
    red_op_10: '#ed1c2411',
    green: '#31CE36',
    teal: '#00867a',
    hot: '#17a2b8',
    warm: '#6861CE',
    cold: '#FFAD46',

    borderColor: '#e2e2e2',
}