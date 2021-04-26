/* global aa algoliasearch */

const urlParams = new URLSearchParams(window.location.search);

const indexName = 'ecommerce_with_settings';
const client = algoliasearch('9I7OJDGW6A', '92a64db1b9631be9fc3162d1f0467796');
const index = client.initIndex(indexName);

index.search(urlParams.get('objectID')).then(({ hits }) => {
  document.getElementById('product-details').innerHTML = `
      <img src="${hits[0].image}" alt="${hits[0].name}" />
      <div class="product-name">${hits[0].name}</div>
      <div class="hit-price">Price $${hits[0].price}</div>
      <div class="hit-description">${hits[0].description}</div>
  `;
});

document.getElementById('convert').addEventListener('click', () => {
  aa('convertedObjectIDsAfterSearch', {
    userToken: 'user-1',
    index: indexName,
    eventName: 'Add to cart',
    queryID: urlParams.get('queryID'),
    objectIDs: [urlParams.get('objectID')],
  });
});