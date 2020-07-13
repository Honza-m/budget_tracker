import ClientsPage from '../clients/ClientsPage';
import EditClients from '../clients/edit_clients/EditClients';


export default (base) => (
    [
        {
            name: 'Your clients',
            url: base + '/',
            component: ClientsPage
        },
        {
            name: 'Edit client',
            url: base + '/select-clients/',
            component: EditClients
        }
    ]
)