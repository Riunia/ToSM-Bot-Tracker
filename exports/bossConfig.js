/* BOSS CONFIG FILE
If new bosses get added, add a new array entry with corresponding properties. 
If channels get increased or decreased, edit the channels value and recreate the placeholder messages if needed. 
Then, recreate the interaction menu on the affected boss thread(s).
*/

bossProperties = [
    { name: 'Apophis',       value: 'apophis',       channels: 13,   key: 'apophisChannel' },
    { name: 'Barbarossa',    value: 'barbarossa',    channels: 13,   key: 'barbarossaChannel' },
    { name: 'Culton',        value: 'culton',        channels: 6,    key: 'cultonChannel' },
    { name: 'Devourer',      value: 'devourer',      channels: 2,    key: 'devourerChannel' },
    { name: 'Dragon',        value: 'dragon',        channels: 2,    key: 'dragonChannel' },
    { name: 'Eva',           value: 'eva',           channels: 8,    key: 'evaChannel' },
    { name: 'Frost Bot',     value: 'frostbot',      channels: 13,   key: 'frostbotChannel' },
    { name: 'Haboela',       value: 'haboela',       channels: 15,   key: 'haboelaChannel' },
    { name: 'Harrah',        value: 'harrah',        channels: 6,    key: 'harrahChannel' },
    { name: 'Lucia',         value: 'lucia',         channels: 13,   key: 'luciaChannel' },
    { name: 'Magma',         value: 'magma',         channels: 8,    key: 'magmaChannel' },
    { name: 'Nakya',         value: 'nakya',         channels: 15,   key: 'nakyaChannel' },
    { name: 'Robarg',        value: 'robarg',        channels: 13,   key: 'robargChannel' },
    { name: 'Rudolph',       value: 'rudolph',       channels: 8,    key: 'rudolphChannel' },
    { name: 'Scylla',        value: 'scylla',        channels: 15,   key: 'scyllaChannel' },
    { name: 'Sobek',         value: 'sobek',         channels: 13,   key: 'sobekChannel' },
    { nanme: 'Zhu Yan',      value: 'zhuyan',        channels: 15,   key: 'zhuyanChannel' },
    //{name: 'boss_name',     value: 'boss_name_lowercase',   channels: 0,  key: 'boss_nameChannel'},
];

exports.bossProperties = bossProperties
