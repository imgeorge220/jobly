function addCommas(num) {

  /*
  Separate integer and fraction and get strings of both. 
  Fraction is undefined if there is no decimal.
  */
  const integerAndFraction = String(num).split('.');
  const [integer, fraction] = integerAndFraction;

  /*
  Format commas into integer string ('1234') => ('1,234')
  converts string into array and reverses to add commas for every third index.
  Then reverses back and converts array back to string.
  */
  const formattedIntegerString = integer
    .split('')
    .reverse()
    .map((val, idx) => {
      if (idx % 3 === 0 && idx !== 0) return `${val},`
      return val;
    })
    .reverse()
    .join('');
  
  // Return result and add fraction back in if it exists.
  return fraction ? formattedIntegerString  + `.${fraction}` : formattedIntegerString;
}

module.exports = addCommas;
