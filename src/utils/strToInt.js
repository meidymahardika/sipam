export function convertStringToInteger(str) {
    // Remove commas from the string
    const stringWithoutCommas = str.replace(/,/g, '');
  
    // Parse the string as an integer
    const result = parseInt(stringWithoutCommas, 10);
  
    // Check if the result is a valid integer
    if (isNaN(result)) {
      console.error('Invalid input for conversion:', str);
      return null; // or handle the error accordingly
    }
  
    return result;
  }