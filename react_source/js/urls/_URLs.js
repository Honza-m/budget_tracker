import budgets from './budgets'
import campaigns from './campaigns';
import clients from './clients';
import platforms from './platforms';
import spend from './spend';

var urls = []
urls = urls.concat(platforms('/clients/:pk/campaigns/platforms'))
urls = urls.concat(spend('/clients/:pk/campaigns/platforms/:plat/spend'))
urls = urls.concat(budgets('/clients/:pk/campaigns/:camp/budgets'))
urls = urls.concat(campaigns('/clients/:pk/campaigns'))
urls = urls.concat(clients('/clients'))

export default urls