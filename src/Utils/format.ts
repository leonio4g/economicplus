import moment from "moment";
import VMasker from "vanilla-masker";

export const formatData = (d: string) => {
    return d ? moment(d, 'YYYY/MM/DD').format('DD/MM/Y') : '';
  };

 export const formatMoney = (x: number) => {
    if (typeof x === 'undefined') return '';

    return VMasker.toMoney(x.toFixed(2), {
      precision: 2,
      separator: ',',
      delimiter: '.',
      unit: 'R$'
    });
  };

  export const formatNumber = (value: number) => {
    if (value) {
      var str = value.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return str.join(".");
    }
  }

  export const maskDate = (value: any) => {
    var v = value;
          if (v.match(/^\d{2}$/) !== null) {
              value = v + '/';
          } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
              value = v + '/';
          }
          return value
  }
