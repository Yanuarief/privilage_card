import { login } from './login/index.js'
import { events } from './events/index.js'
import { promo } from './promo/index.js'
import { tenant } from './tenant/index.js'
import { floormaps } from './floormaps/index.js'
import { facilities } from './facilities/index.js'
import { slider } from './slider/index.js'
import { aboutus } from './aboutus/index.js'
import { menus } from './menus/index.js'
import { tenantcat } from './tenantcat/index.js'
import { pelanggan } from './pelanggan/index.js'
import { tenantMember } from './tenantMember/index.js'
import { eventMember } from './eventMember/index.js'
import { souvenir } from './souvenir/index.js'
import { hadiah } from './hadiah/index.js'
import { news } from './news/index.js'

import { point_setting } from './point_setting/index.js'
import { bank } from './bank/index.js'
import { earnpoint } from './earnpoint/index.js'
import { reedem } from './reedem/index.js'

var page = []

page = page.concat(
    login,
    events,
    promo,
    tenant,
    floormaps,
    facilities,
    slider,
    aboutus,
    menus,
    tenantcat,
    pelanggan,
    tenantMember,
    eventMember,
    souvenir,
    hadiah,
    news,

    point_setting,
    bank,
    earnpoint,
    reedem
);

export default page