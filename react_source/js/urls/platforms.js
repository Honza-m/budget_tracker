import PlatformsPage from '../platforms/PlatformsPage';
import NewPlatform from '../platforms/new_platform/NewPlatform';


export default (base) => (
    [
        {
            name: 'Platforms',
            url: base + '/',
            component: PlatformsPage
        },
        {
            name: 'New platform',
            url: base + '/new/',
            component: NewPlatform
        }
    ]
)