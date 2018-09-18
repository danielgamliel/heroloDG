import {Dimensions} from 'react-native';

// SCREEN ZISE
export let SW = Dimensions.get('window').width;
export let SH = Dimensions.get('window').height;
export let PaddingSize = SW - SW / 16;
export let stretchMinimum = SH /16;
// FONT
export let basicIconFont = 30;
export let smallFont = 11;

