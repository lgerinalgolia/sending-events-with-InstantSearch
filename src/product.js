const urlParams = new URLSearchParams(window.location.search);
const objectID = urlParams.get('objectID');

const indexName = 'ecommerce_with_settings';
const client = algoliasearch('9I7OJDGW6A', '92a64db1b9631be9fc3162d1f0467796');
const index = client.initIndex(indexName);

index.search(objectID).then(({ hits }) => {
  document.getElementById('product-details').innerHTML = `
    <img src="${hits[0].image}" />
    <div class="product-name">${hits[0].name}</div>
    <div class="hit-price">Price $${hits[0].price}</div>
    <div class="hit-description">${hits[0].description}</div>
  `;
});

document.getElementById('add-to-cart').addEventListener('click', () => {
  aa('convertedObjectIDsAfterSearch', {
    userToken: 'user-1',
    index: indexName,
    eventName: 'Product Added to Cart',
    queryID: urlParams.get('queryID'),
    objectIDs: [objectID],
  });
});
