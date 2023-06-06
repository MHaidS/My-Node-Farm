// 17.1. transfer fr index.js replaceTemplate() to replaceTemplate.js; export this function by using module.export; in each module, we have access to a var called 'module' & then set the export's property w/c is just this function in this case; we'll get rid of the name & assign an anonymous function to export property on the module obj, w/c we have access to in every Node.js module; go back to index.js to import it
// const replaceTemplate = (temp, product) => {
module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
