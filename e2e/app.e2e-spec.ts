import { WomenMarketPage } from './app.po';

describe('women-market App', function() {
  let page: WomenMarketPage;

  beforeEach(() => {
    page = new WomenMarketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
