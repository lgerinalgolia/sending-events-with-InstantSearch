const indexName = 'ecommerce_with_settings';

const search = instantsearch({
  indexName,
  searchClient: algoliasearch('9I7OJDGW6A', '92a64db1b9631be9fc3162d1f0467796'),
});

search.use(
  instantsearch.middlewares.createInsightsMiddleware({
    insightsClient: window.aa,
  })
);

aa('setUserToken', 'user-1');

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for a product, brand, name...',
  }),
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, bindEvent) => {
        const productURL =
          'product.html?objectID=' +
          hit.objectID +
          '&queryID=' +
          hit.__queryID;

        return `
          <a class="hit-card" href="${productURL}" ${bindEvent(
            'click',
            hit,
            'clicked the result'
          )}>
            <div class="hit-content">
              <img src="${hit.image}" alt="${hit.name}" />
              <div class="hit-name">${hit._highlightResult.name.value}</div>
            </div>
          </a>
        `;
      },
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
