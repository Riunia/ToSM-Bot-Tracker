/* BOSS CONFIG FILE
If new bosses get added, add a new array entry with corresponding properties. 
If channels get increased or decreased, edit the channels value and recreate the placeholder messages if needed. 
Then, recreate the interaction menu on the affected boss thread(s).
*/

bossProperties = [
    //Aesperia
    { name: 'Apophis',       value: 'apophis',       channels: 37,   key: 'apophisChannel' },
    { name: 'Barbarossa',    value: 'barbarossa',    channels: 37,   key: 'barbarossaChannel' },
    { name: 'Frost Bot',     value: 'frostbot',      channels: 37,   key: 'frostbotChannel' },
    { name: 'Lucia',         value: 'lucia',         channels: 37,   key: 'luciaChannel' },
    { name: 'Robarg',        value: 'robarg',        channels: 37,   key: 'robargChannel' },
    { name: 'Sobek',         value: 'sobek',         channels: 37,   key: 'sobekChannel' },
    //AI
    { name: 'Devourer',      value: 'devourer',      channels: 6,    key: 'devourerChannel' },
    { name: 'Dragon',        value: 'dragon',        channels: 6,    key: 'dragonChannel' },
    //Vera
    { name: 'Eva',           value: 'eva',           channels: 30,    key: 'evaChannel' },
    { name: 'Magma',         value: 'magma',         channels: 30,    key: 'magmaChannel' },
    { name: 'Rudolph',       value: 'rudolph',       channels: 30,    key: 'rudolphChannel' },
    //Abyss
    { name: 'Culton',        value: 'culton',        channels: 20,    key: 'cultonChannel' },
    { name: 'Harrah',        value: 'harrah',        channels: 20,    key: 'harrahChannel' },
    //Innars
    { name: 'Haboela',       value: 'haboela',       channels: 30,   key: 'haboelaChannel' },
    { name: 'Scylla',        value: 'scylla',        channels: 30,   key: 'scyllaChannel' },
    { name: 'Nakya',         value: 'nakya',         channels: 30,   key: 'nakyaChannel' },
    //Domain Nine
    { name: 'Zhuyan',        value: 'zhuyan',        channels: 50,   key: 'zhuyanChannel' },
    { name: 'Black Crow',    value: 'blackcrow',     channels: 50,   key: 'blackcrowChannel' },
    { name: 'Taotie',        value: 'taotie',        channels: 50,   key: 'taotieChannel' },
    //{name: 'boss_name',     value: 'boss_name_lowercase',   channels: 0,  key: 'boss_nameChannel'},
];

exports.bossProperties = bossProperties
