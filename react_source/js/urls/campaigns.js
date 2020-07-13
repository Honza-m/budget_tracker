import CampaignsPage from '../campaigns/CampaignsPage';
import CampaignDetail from '../campaigns/CampaignDetail';
import NewCampaign from '../campaigns/new_campaign/NewCampaign';


export default (base) => (
    [
        {
            name: 'Campaigns',
            url: base + '/',
            component: CampaignsPage
        },
        {
            name: 'New campaign',
            url: base + '/new/',
            component: NewCampaign
        },
        {
            name: 'Campaign detail',
            url: base + '/:camp/',
            component: CampaignDetail
        }
    ]
)