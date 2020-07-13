import SpendPage from '../spend/SpendPage';
import UploadSpend from '../spend/UploadSpend';


export default (base) => (
    [
        {
            name: 'Platform spend',
            url: base + '/',
            component: SpendPage
        },
        {
            name: 'Spend upload',
            url: base + '/upload/',
            component: UploadSpend
        }
    ]
)