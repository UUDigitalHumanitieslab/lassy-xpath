// based on https://www.let.rug.nl/vannoord/Lassy/sa-man_lassy.pdf, http://www.let.rug.nl/vannoord/alp/Alpino/adt.html,
// https://www.let.rug.nl/vannoord/Lassy/alpino_ds.dtd and https://github.com/rug-compling/paqu/blob/master/src/pqserve/attributes.txt
// http://gretel.ccl.kuleuven.be/project/php/TreebankFreqsLASSY.html
export interface XPathAttribute {
    description: string;
    /**
     * [value, description][]
     */
    values: [string, string][];
}

export let XPathAttributes: { [name: string]: XPathAttribute } = {
    'aform': { description: '', values: [] },
    'begin': { description: 'Begin position', values: [] },
    'buiging': {
        description: '',
        values: [
            ['zonder', ''],
            ['met-e', ''],
            ['met-s', '']
        ]
    },
    'case': {
        description: 'Finite verb case',
        values: [
            ['nom', 'Nominative'],
            ['acc', 'Accusative'],
            ['nom_acc', 'Nominative | Accusative'],
            ['gen', 'Genitive'],
            ['dat', 'Dative'],
            ['dat_acc', 'Dative | Accusative'],
            ['obl', ''],
            ['no_obl', ''],
            ['both', '']
        ]
    },
    'cat': {
        description: 'Phrasal category',
        values: [
            ['ap', 'adjective phrase'],
            ['advp', 'adverb phrase'],
            ['ahi', 'aan het-infinitive group'],
            ['conj', 'conjunction'],
            ['cp', 'phrase started by a subordinating conjunction'],
            ['detp', 'word group with a determiner as the head'],
            ['du', 'discourse unit'],
            ['inf', 'bare infinitive group'],
            ['list', ''],
            ['mwu', 'multi-word unit'],
            ['np', 'noun phrase'],
            ['oti', 'om te-infinitive-group'],
            ['ppart', 'passive/perfect participle'],
            ['pp', 'prepositional phrase'],
            ['ppres', 'present participle group'],
            ['rel', 'relative clause'],
            ['smain', 'declarative sentence (verb at the second position)'],
            ['ssub', 'Subordinate clause (verb final)'],
            ['svan', 'van-sentence'],
            ['sv1', 'verb-initial sentence (yes/no question, imperatives)'],
            ['ti', 'te-infinitive group'],
            ['top', ''],
            ['whrel', 'relative clause with embedded antecedent'],
            ['whsub', 'embedded question'],
            ['whq', 'WH-question'],
            ['--', '']
        ]
    },
    'comparative': {
        description: 'Comparative',
        values: [
            ['dan', ''],
            ['als', ''],
            ['dat', ''],
            ['om', ''],
            ['e_als', '"zoveel"']
        ]
    },
    'conjtype': {
        description: 'Conjunction',
        values: [
            ['neven', 'Correlative'],
            ['onder', 'Subordinating']
        ]
    },
    'def': {
        description: 'Article definiteness',
        values: [
            ['def', ''],
            ['indef', ''],
            ['both', '']]
    },
    'dial': {
        description: '',
        values: [
            ['dial', '']
        ]
    },
    'end': { description: 'End position', values: [] },
    'frame': { description: 'Full lexical category', values: [] },
    'gen': {
        description: 'Gender', values: [
            ['de', ''],
            ['het', ''],
            ['both', '']
        ]
    },
    'genus': {
        description: '',
        values: [
            ['genus', ''],
            ['zijd', ''],
            ['masc', ''],
            ['fem', ''],
            ['onz', '']
        ]
    },
    'getal': {
        description: '',
        values: [
            ['getal', ''],
            ['ev', ''],
            ['mv', '']
        ]
    },
    'getal-n': {
        description: '',
        values: [
            ['zonder-n', ''],
            ['mv-n', '']
        ]
    },
    'graad': {
        description: '',
        values: [
            ['basis', ''],
            ['comp', ''],
            ['sup', ''],
            ['dim', '']
        ]
    },
    'his': { description: '', values: [] },
    'his_1': { description: '', values: [] },
    'his_2': { description: '', values: [] },
    'his_1_1': { description: '', values: [] },
    'his_1_2': { description: '', values: [] },
    'his_2_1': { description: '', values: [] },
    'his_2_2': { description: '', values: [] },
    'his_1_1_1': { description: '', values: [] },
    'his_1_1_2': { description: '', values: [] },
    'his_1_2_1': { description: '', values: [] },
    'his_1_2_2': { description: '', values: [] },
    'his_2_1_1': { description: '', values: [] },
    'his_2_1_2': { description: '', values: [] },
    'his_2_2_1': { description: '', values: [] },
    'his_2_2_2': { description: '', values: [] },
    'id': { description: '', values: [] },
    'iets': { description: '', values: [] },
    'index': { description: 'Node index', values: [] },
    'infl': {
        description: 'Inflection of (ad)verb',
        values: [
            ['sg', 'Verb | Det'],
            ['sg1', 'Verb'],
            ['sg3', 'Verb'],
            ['sg_heeft', 'Verb'],
            ['sg_hebt', 'Verb'],
            ['modal_u', 'Verb'],
            ['modal_inv', 'Verb'],
            ['pl', 'Verb | Det'],
            ['imp(sg1)', 'Verb'],
            ['imp(modal_u) subjunctive', 'Verb'],
            ['psp', 'Verb'],
            ['inf', 'Verb'],
            ['inf(e)', 'Verb'],
            ['inf(no_e)', 'Verb'],
            ['inf_ipp', 'Verb'],
            ['e', 'Adj'],
            ['no_e', 'Adj'],
            ['er', 'Adj'],
            ['both', 'Adj | Det | Number'],
            ['pred', 'Adj'],
            ['anders', 'Adj'],
            ['ge_e', 'Adj'],
            ['ge_no_', 'Adj'],
            ['ge_both', 'Adj'],
            ['stof', 'Adj'],
            ['postn_no_e', 'Adj'],
            ['postn_e', 'Adj'],
            ['postn_both', 'Adj'],
            ['meer', 'Adj'],
            ['ere', 'Adj'],
            ['ste', 'Adj'],
            ['st', 'Adj'],
            ['het_st', 'Adj'],
            ['end', 'Adj'],
            ['ende', 'Adj'],
            ['sten', 'Adj'],
            ['eren', 'Adj'],
            ['de', 'Det'],
            ['het', 'Det'],
            ['een', 'Det'],
            ['pron', 'Det'],
            ['geen', 'Det'],
            ['pl_num', 'Det | Number'],
            ['alle', 'Det'],
            ['enkele', 'Det'],
            ['wat', 'Det'],
            ['welke', 'Det'],
            ['elke', 'Det'],
            ['der', 'Det'],
            ['pl_indef', 'Det'],
            ['al', 'Det'],
            ['enkel', 'Det'],
            ['zulke', 'Det'],
            ['welk', 'Det'],
            ['den', 'Det'],
            ['des', 'Det'],
            ['sg_num', 'Det | Number']
        ]
    },
    'lcat': { description: 'Complementized category', values: [] },
    'lemma': { description: 'Word lemma', values: [] },
    'lwtype': {
        description: '',
        values: [
            ['bep', ''],
            ['onbep', '']
        ]
    },
    'mwu_root': { description: '', values: [] },
    'mwu_sense': { description: '', values: [] },
    'naamval': {
        description: '',
        values: [
            ['stan', ''],
            ['nomin', ''],
            ['obl', ''],
            ['bijz', ''],
            ['gen', ''],
            ['dat', '']
        ]
    },
    'neclass': {
        description: 'Named entity class',
        values: [
            ['LOC', 'Location'],
            ['PER', 'Person'],
            ['ORG', 'Organization'],
            ['MISC', 'Miscellaneous'],
            ['year', 'Year']
        ]
    },
    'npagr': {
        description: '',
        values: [
            ['agr', ''],
            ['evon', ''],
            ['rest', ''],
            ['evz', ''],
            ['mv', ''],
            ['agr3', ''],
            ['evmo', ''],
            ['rest3', ''],
            ['evf', '']
        ]
    },
    'ntype': {
        description: '',
        values: [
            ['soort', ''],
            ['eigen', '']
        ]
    },
    'num': {
        description: 'Number',
        values: [
            ['sg', ''],
            ['pl', ''],
            ['both', ''],
            ['meas', ''],
            ['bare_meas', ''],
            ['pl_num', ''],
            ['sg_num', '']
        ]
    },
    'numtype': {
        description: '',
        values: [
            ['hoofd', ''],
            ['rang', '']
        ]
    },
    'other_id': { description: '', values: [] },
    'pb': { description: '', values: [] },
    'pdtype': {
        description: '',
        values: [
            ['pron', ''],
            ['adv-pron', ''],
            ['det', ''],
            ['grad', '']
        ]
    },
    'per': {
        description: 'Person',
        values: [
            ['u', ''],
            ['both', ''],
            ['fir', ''],
            ['inv', ''],
            ['je', ''],
            ['thi', ''],
            ['u_thi', '']
        ]
    },
    'personalized': { description: '', values: [] },
    'persoon': {
        description: '',
        values: [
            ['1', ''],
            ['2', ''],
            ['2v', ''],
            ['2b', ''],
            ['3', ''],
            ['3p', ''],
            ['3m', ''],
            ['3v', ''],
            ['3o', '']
        ]
    },
    'pos': {
        description: 'Simplified POS-tag',
        values: [
            ['adj', 'Adjective'],
            ['adv', 'Adverb'],
            ['comp', 'Complementizer'],
            ['comparative', 'Comparative'],
            ['det', 'Determiner'],
            ['etc', ''],
            ['fixed', 'Fixed part of a fixed expression'],
            ['max', ''],
            ['name', 'Name'],
            ['noun', 'Noun'],
            ['num', 'Number'],
            ['part', 'Particle'],
            ['pp', 'Pronominal adverb'],
            ['pron', 'Pronoun'],
            ['prep', 'Preposition'],
            ['punct', 'Punctuation'],
            ['tag', ''],
            ['verb', 'Verb'],
            ['vg', 'Conjunction'],
            ['- -', 'Not analyzed'],
            ['UNKNOWN', 'Parse problem']
        ]
    },
    'positie': {
        description: '',
        values: [
            ['prenom', ''],
            ['nom', ''],
            ['postnom', ''],
            ['vrij', '']
        ]
    },
    'postag': {
        description: 'POS-tag CGN/DCOI/LASSY style',
        values: [
            ['N(soort,ev,basis,zijd,stan)', 'die stoel, deze muziek, de filter'],
            ['N(soort,ev,basis,onz,stan)', 'het kind, ons huis, het filter'],
            ['N(soort,ev,dim,onz,stan)', 'dit stoeltje, op ’t nippertje'],
            ['N(soort,ev,basis,gen)', '’s avonds, de heer des huizes'],
            ['N(soort,ev,dim,gen)', 'vadertjes pijp'],
            ['N(soort,ev,basis,dat)', 'ter plaatse, heden ten dage'],
            ['N(soort,mv,basis)', 'stoelen, kinderen, hersenen'],
            ['N(soort,mv,dim)', 'stoeltjes, huisjes, hersentjes'],
            ['N(eigen,ev,basis,zijd,stan)', 'de Noordzee, de Kemmelberg, Karel'],
            ['N(eigen,ev,basis,onz,stan)', 'het Hageland, het Nederlands'],
            ['N(eigen,ev,dim,onz,stan)', 'het slimme Kareltje'],
            ['N(eigen,ev,basis,gen)', 'des Heren, Hagelands trots'],
            ['N(eigen,ev,dim,gen)', 'Kareltjes fiets'],
            ['N(eigen,ev,basis,dat)', 'wat den Here toekomt'],
            ['N(eigen,mv,basis)', 'de Ardennen, de Middeleeuwen'],
            ['N(eigen,mv,dim)', 'de Maatjes'],
            ['N(soort,ev,basis,genus,stan)', 'een riool, geen filter'],
            ['N(eigen,ev,basis,genus,stan)', 'Linux, Esselte'],
            ['ADJ(prenom,basis,zonder)', 'een mooi huis, een houten pot'],
            ['ADJ(prenom,basis,met-e,stan)', 'mooie huizen, een grote pot'],
            ['ADJ(prenom,basis,met-e,bijz)', 'zaliger gedachtenis, van goeden huize'],
            ['ADJ(prenom,comp,zonder)', 'een mooier huis'],
            ['ADJ(prenom,comp,met-e,stan)', 'mooiere huizen, een grotere pot'],
            ['ADJ(prenom,comp,met-e,bijz)', 'van beteren huize'],
            ['ADJ(prenom,sup,zonder)', 'een alleraardigst mens'],
            ['ADJ(prenom,sup,met-e,stan)', 'de mooiste keuken, het grootste paard'],
            ['ADJ(prenom,sup,met-e,bijz)', 'bester kwaliteit'],
            ['ADJ(nom,basis,zonder,zonder-n)', 'in het groot, het groen'],
            ['ADJ(nom,basis,zonder,mv-n)', 'de timiden, dezelfden'],
            ['ADJ(nom,basis,met-e,zonder-n,stan)', 'het leuke is dat, een grote met tartaar'],
            ['ADJ(nom,basis,met-e,zonder-n,bijz)', 'hosanna in den hogen'],
            ['ADJ(nom,basis,met-e,mv-n)', 'de rijken'],
            ['ADJ(nom,comp,zonder,zonder-n)', ''],
            ['ADJ(nom,comp,met-e,zonder-n,stan)', 'een betere'],
            ['ADJ(nom,comp,met-e,zonder-n,bijz)', ''],
            ['ADJ(nom,comp,met-e,mv-n)', 'de ouderen'],
            ['ADJ(nom,sup,zonder,zonder-n)', 'op z’n best, om ter snelst'],
            ['ADJ(nom,sup,met-e,zonder-n,stan)', 'het leukste is dat, het langste blijven'],
            ['ADJ(nom,sup,met-e,zonder-n,bijz)', 'des Allerhoogsten'],
            ['ADJ(nom,sup,met-e,mv-n)', 'de slimsten'],
            ['ADJ(postnom,basis,zonder)', 'rivieren bevaarbaar in de winter'],
            ['ADJ(postnom,basis,met-s)', 'iets moois'],
            ['ADJ(postnom,comp,zonder)', 'een getal groter dan'],
            ['ADJ(postnom,comp,met-s)', 'iets gekkers kon ik niet bedenken'],
            ['ADJ(vrij,basis,zonder)', 'die stok is lang, lang slapen'],
            ['ADJ(vrij,comp,zonder)', 'deze stok is langer, langer slapen'],
            ['ADJ(vrij,sup,zonder)', 'die stok is het langst, het langst slapen'],
            ['ADJ(vrij,dim,zonder)', 'het is hier stilletjes, stilletjes weggaan'],
            ['WW(pv,tgw,ev)', 'ik kom, speel je, hij is, zwijg'],
            ['WW(pv,tgw,mv)', 'komen, spelen'],
            ['WW(pv,tgw,met-t)', 'jij komt, hij speelt, zwijgt'],
            ['WW(pv,verl,ev)', 'kwam, speelde'],
            ['WW(pv,verl,mv)', 'kwamen, speelden'],
            ['WW(pv,verl,met-t)', 'kwaamt, gingt'],
            ['WW(pv,conj,ev)', 'kome, leve de koning'],
            ['WW(inf,prenom,zonder)', 'de nog te lezen post'],
            ['WW(inf,prenom,met-e)', 'een niet te weerstane verleiding'],
            ['WW(inf,nom,zonder,zonder-n)', '(het) spelen, (het) schaatsen'],
            ['WW(inf,vrij,zonder)', 'zal komen'],
            ['WW(vd,prenom,zonder)', 'een verwittigd man, een gekregen paard'],
            ['WW(vd,prenom,met-e)', 'een getemde feeks'],
            ['WW(vd,nom,met-e,zonder-n)', 'het geschrevene, een gekwetste'],
            ['WW(vd,nom,met-e,mv-n)', 'gekwetsten, gedupeerden'],
            ['WW(vd,vrij,zonder)', 'is gekomen'],
            ['WW(od,prenom,zonder)', 'een slapend kind'],
            ['WW(od,prenom,met-e)', 'een piano spelende aap, slapende kinderen'],
            ['WW(od,nom,met-e,zonder-n)', 'het resterende, een klagende'],
            ['WW(od,nom,met-e,mv-n)', 'de wachtenden'],
            ['WW(od,vrij,zonder)', 'liep lachend weg, al doende leert men'],
            ['TW(hoofd,prenom,stan)', 'vier cijfers'],
            ['TW(hoofd,prenom,bijz)', 'eens geestes zijn, te enen male'],
            ['TW(hoofd,nom,zonder-n,basis)', 'er is er een ontsnapt'],
            ['TW(hoofd,nom,mv-n,basis)', 'met z’n vieren'],
            ['TW(hoofd,nom,zonder-n,dim)', 'er is er eentje ontsnapt, op z’n eentje'],
            ['TW(hoofd,nom,mv-n,dim)', 'met z’n tweetjes'],
            ['TW(hoofd,vrij)', 'veertig worden, honderd rijden, hoeveel sneller'],
            ['TW(rang,prenom,stan)', 'de vierde man'],
            ['TW(rang,prenom,bijz)', 'te elfder ure'],
            ['TW(rang,nom,zonder-n)', 'het eerste, (de) vierde eindigen, Karel de Vijfde'],
            ['TW(rang,nom,mv-n)', 'de eersten, iets aan derden verkopen'],
            ['VNW(pers,pron,nomin,vol,1,ev)', 'ik'],
            ['VNW(pers,pron,nomin,nadr,1,ev)', 'ikzelf, ikke'],
            ['VNW(pers,pron,nomin,red,1,ev)', '’k'],
            ['VNW(pers,pron,nomin,vol,1,mv)', 'wij'],
            ['VNW(pers,pron,nomin,nadr,1,mv)', 'wijzelf'],
            ['VNW(pers,pron,nomin,red,1,mv)', 'we'],
            ['VNW(pers,pron,nomin,vol,2v,ev)', 'jij'],
            ['VNW(pers,pron,nomin,nadr,2v,ev)', 'jijzelf'],
            ['VNW(pers,pron,nomin,red,2v,ev)', 'je'],
            ['VNW(pers,pron,nomin,vol,2b,getal)', 'u'],
            ['VNW(pers,pron,nomin,nadr,2b,getal)', 'uzelf'],
            ['VNW(pers,pron,nomin,vol,2,getal)', 'gij'],
            ['VNW(pers,pron,nomin,nadr,2,getal)', 'gijzelf'],
            ['VNW(pers,pron,nomin,red,2,getal)', 'ge'],
            ['VNW(pers,pron,nomin,vol,3,ev,masc)', 'hij'],
            ['VNW(pers,pron,nomin,nadr,3m,ev,masc)', 'hijzelf'],
            ['VNW(pers,pron,nomin,red,3,ev,masc)', 'ie'],
            ['VNW(pers,pron,nomin,red,3p,ev,masc)', 'men'],
            ['VNW(pers,pron,nomin,vol,3v,ev,fem)', 'zij'],
            ['VNW(pers,pron,nomin,nadr,3v,ev,fem)', 'zijzelf'],
            ['VNW(pers,pron,nomin,vol,3p,mv)', 'zij'],
            ['VNW(pers,pron,nomin,nadr,3p,mv)', 'zijzelf'],
            ['VNW(pers,pron,obl,vol,2v,ev)', 'jou'],
            ['VNW(pers,pron,obl,vol,3,ev,masc)', 'hem'],
            ['VNW(pers,pron,obl,nadr,3m,ev,masc)', 'hemzelf'],
            ['VNW(pers,pron,obl,red,3,ev,masc)', '’m'],
            ['VNW(pers,pron,obl,vol,3,getal,fem)', 'haar'],
            ['VNW(pers,pron,obl,nadr,3v,getal,fem)', 'haarzelf'],
            ['VNW(pers,pron,obl,red,3v,getal,fem)', '’r, d’r'],
            ['VNW(pers,pron,obl,vol,3p,mv)', 'hen, hun'],
            ['VNW(pers,pron,obl,nadr,3p,mv)', 'henzelf, hunzelf'],
            ['VNW(pers,pron,stan,nadr,2v,mv)', 'jullie'],
            ['VNW(pers,pron,stan,red,3,ev,onz)', 'het, ’t'],
            ['VNW(pers,pron,stan,red,3,ev,fem)', 'ze'],
            ['VNW(pers,pron,stan,red,3,mv)', 'ze'],
            ['VNW(pers,pron,gen,vol,1,ev)', 'mijns gelijke, gedenk mijner'],
            ['VNW(pers,pron,gen,vol,1,mv)', 'ons gelijke, velen onzer'],
            ['VNW(pers,pron,gen,vol,2,getal)', 'uws gelijke, wie uwer'],
            ['VNW(pers,pron,gen,vol,3m,ev)', 'zijns gelijke, zijner'],
            ['VNW(pers,pron,gen,vol,3v,getal)', 'haars gelijke, harer'],
            ['VNW(pers,pron,gen,vol,3p,mv)', 'huns gelijke, een hunner'],
            ['VNW(pr,pron,obl,vol,1,ev)', 'mij'],
            ['VNW(pr,pron,obl,nadr,1,ev)', 'mezelf, mijzelf'],
            ['VNW(pr,pron,obl,red,1,ev)', 'me'],
            ['VNW(pr,pron,obl,vol,1,mv)', 'ons'],
            ['VNW(pr,pron,obl,nadr,1,mv)', 'onszelf'],
            ['VNW(pr,pron,obl,red,2v,getal)', 'je'],
            ['VNW(pr,pron,obl,nadr,2v,getal)', 'jezelf'],
            ['VNW(pr,pron,obl,vol,2,getal)', 'u'],
            ['VNW(pr,pron,obl,nadr,2,getal)', 'uzelf'],
            ['VNW(refl,pron,obl,red,3,getal)', 'zich'],
            ['VNW(refl,pron,obl,nadr,3,getal)', 'zichzelf'],
            ['VNW(recip,pron,obl,vol,persoon,mv)', 'elkaar, mekaar, elkander'],
            ['VNW(recip,pron,gen,vol,persoon,mv)', 'elkaars, mekaars, elkanders'],
            ['VNW(bez,det,stan,vol,1,ev,prenom,zonder,agr)', 'mijn paard(en)'],
            ['VNW(bez,det,stan,vol,1,ev,prenom,met-e,rest)', 'mijne heren'],
            ['VNW(bez,det,stan,red,1,ev,prenom,zonder,agr)', 'm’n paard(en)'],
            ['VNW(bez,det,stan,vol,1,mv,prenom,zonder,evon)', 'ons paard'],
            ['VNW(bez,det,stan,vol,1,mv,prenom,met-e,rest)', 'onze paarden'],
            ['VNW(bez,det,stan,vol,2,getal,prenom,zonder,agr)', 'uw paard(en)'],
            ['VNW(bez,det,stan,vol,2,getal,prenom,met-e,rest)', 'uwe heiligheid'],
            ['VNW(bez,det,stan,vol,2v,ev,prenom,zonder,agr)', 'jouw paard(en)'],
            ['VNW(bez,det,stan,red,2v,ev,prenom,zonder,agr)', 'je paard(en)'],
            ['VNW(bez,det,stan,nadr,2v,mv,prenom,zonder,agr)', 'jullie paard(en)'],
            ['VNW(bez,det,stan,vol,3,ev,prenom,zonder,agr)', 'zijn paard(en], haar kind'],
            ['VNW(bez,det,stan,vol,3m,ev,prenom,met-e,rest)', 'zijne excellentie'],
            ['VNW(bez,det,stan,vol,3v,ev,prenom,met-e,rest)', 'hare majesteit'],
            ['VNW(bez,det,stan,red,3,ev,prenom,zonder,agr)', 'z’n paard'],
            ['VNW(bez,det,stan,vol,3,mv,prenom,zonder,agr)', 'hun paarden'],
            ['VNW(bez,det,stan,vol,3p,mv,prenom,met-e,rest)', 'hunne'],
            ['VNW(bez,det,stan,red,3,getal,prenom,zonder,agr)', '’r paard, d’r paard'],
            ['VNW(bez,det,gen,vol,1,ev,prenom,zonder,evmo)', 'mijns inziens'],
            ['VNW(bez,det,gen,vol,1,ev,prenom,met-e,rest)', 'een mijner vrienden'],
            ['VNW(bez,det,gen,vol,1,mv,prenom,met-e,evmo)', 'onzes inziens'],
            ['VNW(bez,det,gen,vol,1,mv,prenom,met-e,rest)', 'een onzer vrienden'],
            ['VNW(bez,det,gen,vol,2,getal,prenom,zonder,evmo)', 'uws'],
            ['VNW(bez,det,gen,vol,2,getal,prenom,met-e,rest)', 'een uwer vrienden'],
            ['VNW(bez,det,gen,vol,2v,ev,prenom,met-e,rest)', 'een jouwer vrienden'],
            ['VNW(bez,det,gen,vol,3,ev,prenom,zonder,evmo)', 'zijns inziens'],
            ['VNW(bez,det,gen,vol,3,ev,prenom,met-e,rest)', 'een zijner vrienden'],
            ['VNW(bez,det,gen,vol,3v,ev,prenom,zonder,evmo)', 'haars inziens'],
            ['VNW(bez,det,gen,vol,3v,ev,prenom,met-e,rest)', 'een harer vrienden'],
            ['VNW(bez,det,gen,vol,3p,mv,prenom,zonder,evmo)', 'huns inziens'],
            ['VNW(bez,det,gen,vol,3p,mv,prenom,met-e,rest)', 'een hunner vrienden'],
            ['VNW(bez,det,dat,vol,1,ev,prenom,met-e,evmo)', 'te mijnen huize'],
            ['VNW(bez,det,dat,vol,1,ev,prenom,met-e,evf)', 'te mijner ere'],
            ['VNW(bez,det,dat,vol,1,mv,prenom,met-e,evmo)', 'te onzen behoeve'],
            ['VNW(bez,det,dat,vol,1,mv,prenom,met-e,evf)', 'te onzer ere'],
            ['VNW(bez,det,dat,vol,2,getal,prenom,met-e,evmo)', 'te uwen behoeve'],
            ['VNW(bez,det,dat,vol,2,getal,prenom,met-e,evf)', 'te uwer ere'],
            ['VNW(bez,det,dat,vol,2v,ev,prenom,met-e,evf)', 'te jouwer nagedachtenis'],
            ['VNW(bez,det,dat,vol,3,ev,prenom,met-e,evmo)', 'zijnen'],
            ['VNW(bez,det,dat,vol,3,ev,prenom,met-e,evf)', 'te zijner tijd'],
            ['VNW(bez,det,dat,vol,3v,ev,prenom,met-e,evmo)', 'haren'],
            ['VNW(bez,det,dat,vol,3v,ev,prenom,met-e,evf)', 'te harer ere'],
            ['VNW(bez,det,dat,vol,3p,mv,prenom,met-e,evmo)', 'hunnen'],
            ['VNW(bez,det,dat,vol,3p,mv,prenom,met-e,evf)', 'te hunner ere'],
            ['VNW(bez,det,stan,vol,1,ev,nom,met-e,zonder-n)', 'het mijne'],
            ['VNW(bez,det,stan,vol,1,mv,nom,met-e,zonder-n)', 'de onze'],
            ['VNW(bez,det,stan,vol,2,getal,nom,met-e,zonder-n)', 'het uwe'],
            ['VNW(bez,det,stan,vol,2v,ev,nom,met-e,zonder-n)', 'de jouwe'],
            ['VNW(bez,det,stan,vol,3m,ev,nom,met-e,zonder-n)', 'het zijne'],
            ['VNW(bez,det,stan,vol,3v,ev,nom,met-e,zonder-n)', 'de hare'],
            ['VNW(bez,det,stan,vol,3p,mv,nom,met-e,zonder-n)', 'het hunne'],
            ['VNW(bez,det,stan,vol,1,ev,nom,met-e,mv-n)', 'de mijnen'],
            ['VNW(bez,det,stan,vol,1,mv,nom,met-e,mv-n)', 'de onzen'],
            ['VNW(bez,det,stan,vol,2,getal,nom,met-e,mv-n)', 'de uwen'],
            ['VNW(bez,det,stan,vol,2v,ev,nom,met-e,mv-n)', 'de jouwen'],
            ['VNW(bez,det,stan,vol,3m,ev,nom,met-e,mv-n)', 'de zijnen'],
            ['VNW(bez,det,stan,vol,3v,ev,nom,met-e,mv-n)', 'de haren'],
            ['VNW(bez,det,stan,vol,3p,mv,nom,met-e,mv-n)', 'de hunnen'],
            ['VNW(bez,det,dat,vol,1,ev,nom,met-e,zonder-n)', 'te mijnent'],
            ['VNW(bez,det,dat,vol,1,mv,nom,met-e,zonder-n)', 'ten onzent'],
            ['VNW(bez,det,dat,vol,2,getal,nom,met-e,zonder-n)', 'ten uwent'],
            ['VNW(bez,det,dat,vol,3m,ev,nom,met-e,zonder-n)', 'te zijnent'],
            ['VNW(bez,det,dat,vol,3v,ev,nom,met-e,zonder-n)', 'ten harent'],
            ['VNW(bez,det,dat,vol,3p,mv,nom,met-e,zonder-n)', 'ten hunnent'],
            ['VNW(vrag,pron,stan,nadr,3o,ev)', 'watte'],
            ['VNW(betr,pron,stan,vol,persoon,getal)', 'de man die daar staat'],
            ['VNW(betr,pron,stan,vol,3,ev)', 'het kind dat je daar ziet'],
            ['VNW(betr,det,stan,nom,zonder,zonder-n)', 'hetgeen je daar ziet, het feest tijdens hetwelk'],
            ['VNW(betr,det,stan,nom,met-e,zonder-n)', 'op hetgene de gemeente doet'],
            ['VNW(betr,pron,gen,vol,3o,ev)', 'het warenhuis welks directeur hem een baan had aangeboden'],
            ['VNW(betr,pron,gen,vol,3o,getal)', 'de kathedraal welker gewelven'],
            ['VNW(vb,pron,stan,vol,3p,getal)', 'wie gaat er mee'],
            ['VNW(vb,pron,stan,vol,3o,ev)', 'wat ik niet begrijp is'],
            ['VNW(vb,pron,gen,vol,3m,ev)', 'wiens hoed is dit'],
            ['VNW(vb,pron,gen,vol,3v,ev)', 'de vrouw wier hoed daar hangt'],
            ['VNW(vb,pron,gen,vol,3p,mv)', 'de studenten tegen wier houding ...'],
            ['VNW(vb,adv-pron,obl,vol,3o,getal)', 'waar ga je naartoe, de trein waar we op staan te wachten'],
            ['VNW(excl,pron,stan,vol,3,getal)', 'wat een dwaasheid, wat kan jij liegen zeg'],
            ['VNW(vb,det,stan,prenom,zonder,evon)', 'welk kind'],
            ['VNW(vb,det,stan,prenom,met-e,rest)', 'welke kinderen'],
            ['VNW(vb,det,stan,nom,met-e,zonder-n)', 'welke vind jij de mooiste'],
            ['VNW(excl,det,stan,vrij,zonder)', 'welk een dwaasheid'],
            ['VNW(aanw,pron,stan,vol,3o,ev)', 'dat, dit, zulks'],
            ['VNW(aanw,pron,stan,nadr,3o,ev)', 'datte, ditte'],
            ['VNW(aanw,pron,stan,vol,3,getal)', 'die'],
            ['VNW(aanw,pron,gen,vol,3m,ev)', 'diens voorkeur'],
            ['VNW(aanw,pron,gen,vol,3o,ev)', 'en dies meer'],
            ['VNW(aanw,adv-pron,obl,vol,3o,getal)', 'hier, daar'],
            ['VNW(aanw,adv-pron,stan,red,3,getal)', 'd’r, het niet-kwantitatieve ‘er’'],
            ['VNW(aanw,det,stan,prenom,zonder,evon)', 'dat boek, dit dier, ginds bos, zulk hout'],
            ['VNW(aanw,det,stan,prenom,zonder,rest)', 'die stoel(en)'],
            ['VNW(aanw,det,stan,prenom,zonder,agr)', 'zo’n boek(en)'],
            ['VNW(aanw,det,stan,prenom,met-e,rest)', 'deze man, gene zijde, gindse heuvel, zulke balken'],
            ['VNW(aanw,det,gen,prenom,met-e,rest)', 'een dezer dagen, de notulen dier vergadering'],
            ['VNW(aanw,det,dat,prenom,met-e,evmo)', 'te dien tijde'],
            ['VNW(aanw,det,dat,prenom,met-e,evf)', 'in dier voege'],
            ['VNW(aanw,det,stan,nom,met-e,zonder-n)', 'deze, gene, datgene, degene, diegene'],
            ['VNW(aanw,det,stan,nom,met-e,mv-n)', 'dezen, genen, degenen, diegenen'],
            ['VNW(aanw,det,gen,nom,met-e,zonder-n)', 'schrijver dezes, de twintigste dezer'],
            ['VNW(aanw,det,dat,nom,met-e,zonder-n)', 'dat is dan bij dezen beslist'],
            ['VNW(aanw,det,stan,vrij,zonder)', 'zulk een vreemde gedachte'],
            ['VNW(onbep,pron,stan,vol,3p,ev)', 'alleman, (n)iemand, iedereen, elkeen, menigeen'],
            ['VNW(onbep,pron,stan,vol,3o,ev)', 'alles, (n)iets, niks, wat, zoiets'],
            ['VNW(onbep,pron,gen,vol,3p,ev)', 'allemans, andermans, (n)iemands, (een)ieders'],
            ['VNW(onbep,adv-pron,obl,vol,3o,getal)', '(n)ergens, overal'],
            ['VNW(onbep,adv-pron,gen,red,3,getal)', 'het kwantitatieve ‘er’'],
            ['VNW(onbep,det,stan,prenom,zonder,evon)', 'elk huis, ieder kind, enig benul, een enkel woord, sommig bier'],
            ['VNW(onbep,det,stan,prenom,zonder,agr)', 'geen kind(eren], menig politicus'],
            ['VNW(onbep,det,stan,prenom,met-e,evz)', 'elke hond, iedere keer, ene mijnheer X, menige'],
            ['VNW(onbep,det,stan,prenom,met-e,mv)', 'ettelijke'],
            ['VNW(onbep,det,stan,prenom,met-e,rest)', 'sommige, enige, enkele'],
            ['VNW(onbep,det,stan,prenom,met-e,agr)', 'alle mensen, hoop, vee'],
            ['VNW(onbep,det,gen,prenom,met-e,mv)', 'proletariers aller landen'],
            ['VNW(onbep,det,dat,prenom,met-e,evmo)', 'te allen prijze'],
            ['VNW(onbep,det,dat,prenom,met-e,evf)', 'te eniger tijd'],
            ['VNW(onbep,grad,stan,prenom,zonder,agr,basis)', 'veel plezier, weinig geld'],
            ['VNW(onbep,grad,stan,prenom,met-e,agr,basis)', 'het vele plezier, de weinige toeschouwers'],
            ['VNW(onbep,grad,stan,prenom,met-e,mv,basis)', 'beide mannen'],
            ['VNW(onbep,grad,stan,prenom,zonder,agr,comp)', 'meer tijd, minder werk'],
            ['VNW(onbep,grad,stan,prenom,met-e,agr,sup)', 'de meeste mensen, het minste tijd'],
            ['VNW(onbep,grad,stan,prenom,met-e,agr,comp)', 'in mindere mate'],
            ['VNW(onbep,det,stan,nom,met-e,mv-n)', 'allen, sommigen, enkelen, de enen'],
            ['VNW(onbep,det,stan,nom,met-e,zonder-n)', 'het ´ene ... het andere'],
            ['VNW(onbep,det,stan,nom,zonder,zonder-n)', 'het ´e´en en ander'],
            ['VNW(onbep,det,gen,nom,met-e,mv-n)', 'met aller instemming'],
            ['VNW(onbep,grad,stan,nom,met-e,zonder-n,basis)', 'het weinige'],
            ['VNW(onbep,grad,stan,nom,met-e,mv-n,basis)', 'velen, weinigen, beiden'],
            ['VNW(onbep,grad,stan,nom,met-e,zonder-n,sup)', 'het minste wat je kan zeggen, de meeste'],
            ['VNW(onbep,grad,stan,nom,met-e,mv-n,sup)', 'de minsten, de meesten'],
            ['VNW(onbep,grad,stan,nom,zonder,mv-n,dim)', 'met z’n beidjes'],
            ['VNW(onbep,grad,gen,nom,met-e,mv-n,basis)', 'tot veler verbazing, met beider instemming'],
            ['VNW(onbep,det,stan,vrij,zonder)', 'ze kregen elk/ieder/allebei een bal, al die mensen'],
            ['VNW(onbep,grad,stan,vrij,zonder,basis)', 'dat is te weinig, veel groter'],
            ['VNW(onbep,grad,stan,vrij,zonder,sup)', 'de minst gevraagde, de meest gezochte'],
            ['VNW(onbep,grad,stan,vrij,zonder,comp)', 'minder werken, meer slapen'],
            ['LID(bep,stan,evon)', 'het kind, in ’t geniep'],
            ['LID(bep,stan,rest)', 'de hond(en], de kinderen'],
            ['LID(bep,gen,evmo)', 'des duivels, ’s avonds,'],
            ['LID(bep,gen,rest)', 'der Nederlandse taal, der Belgen'],
            ['LID(bep,dat,evmo)', 'op den duur, om den brode'],
            ['LID(bep,dat,evf)', 'in der minne'],
            ['LID(bep,dat,mv)', 'die in den hemelen zijt'],
            ['LID(onbep,stan,agr)', 'een kind, een mensen dat er waren'],
            ['LID(onbep,gen,evf)', 'de kracht ener vrouw'],
            ['VZ(init)', 'met een lepeltje, met Jan in het hospitaal, met zo te roepen'],
            ['VZ(fin)', 'liep de trap af, bij de beesten af, speelt het bandje af'],
            ['VZ(versm)', 'ten strijde, ten hoogste, ter plaatse'],
            ['VG(neven)', 'Jan en Peter; en toen gebeurde het'],
            ['VG(onder)', 'omdat ze zich niet goed voelt'],
            ['BW()', 'gisteren, nu, niet, nog, al, hoe'],
            ['TSW()', 'oei, amai, uh, hoera'],
            ['N(soort,dial)', 'bompa*d'],
            ['N(eigen,dial)', '@@'],
            ['ADJ(dial)', 'ne*d langen*d toot*d'],
            ['WW(dial)', '’k zen*d nie*d thuis, ’k hem*d gee*d geld'],
            ['TW(hoofd,dial)', ''],
            ['TW(rang,dial)', 'den*d elfste*d'],
            ['VNW(pers,pron,dial)', 'kom de*d gij mee, ’k heb ulie*d gezien'],
            ['VNW(refl,pron,dial', ''],
            ['VNW(recip,pron,dial)', 'we zien malkanderen*d niet veel'],
            ['VNW(bez,det,dial)', 'hij heeft z’ne*d frak*d vergeten'],
            ['VNW(vrag,pron,dial)', ''],
            ['VNW(vrag,det,dial)', ''],
            ['VNW(betr,pron,dial)', ''],
            ['VNW(betr,det,dial)', ''],
            ['VNW(excl,pron,dial)', ''],
            ['VNW(excl,det,dial)', ''],
            ['VNW(aanw,pron,dial)', ''],
            ['VNW(aanw,det,dial)', 'diejen*d boek, dees*d week'],
            ['VNW(onbep,pron,dial)', 'z’ hebben iet*d gezien'],
            ['VNW(onbep,det,dial)', 'ze kan elken*d dag vertrekken'],
            ['LID(bep,dial)', 'het gevecht met den*dbeer'],
            ['LID(onbep,dial)', 'nen*d toffe gast, ne*d vieze vent'],
            ['VZ(init,dial)', 'me*d veel geduld'],
            ['VZ(fin,dial)', ''],
            ['VG(neven,dial)', ''],
            ['VG(onder,dial)', '’t schijnt da*d ze nie*d kunnen komen'],
            ['BW(dial)', 'efkes*d, nie*d'],
            ['TSW(dial)', 'neeje*d, wablieft*d'],
            ['SPEC(afgebr)', 'uitge*a, binnen-'],
            ['SPEC(onverst)', 'ggg, xxx, Xxx'],
            ['SPEC(vreemd)', 'whatever*v, ad, hoc, wishful'],
            ['SPEC(deeleigen)', 'Den, Haag, New, York'],
            ['SPEC(meta)', '(het woord) homosexueel'],
            ['SPEC(comment)', 'voor commentaren'],
            ['SPEC(achter)', 'voor achtergrondgeluid'],
            ['SPEC(afk)', 'd.w.z., dwz, enz., EHBO'],
            ['SPEC(symb)', '@, %, NaCl, =, emoticons'],
            ['LET()', '., ..., ?']
        ]
    },
    'pron': { description: '', values: [] },
    'pt': {
        description: 'POS value (LASSY)',
        values: [
            ['let', 'Punctuation'],
            ['spec', 'Special'],
            ['bw', 'Adverb'],
            ['vg', 'Conjunction'],
            ['lid', 'Article'],
            ['vnw', 'Pronoun'],
            ['tw', 'Numeral'],
            ['ww', 'Verb'],
            ['adj', 'Adjective'],
            ['n', 'Noun'],
            ['tsw', 'Interjection'],
            ['vz', 'Preposition']
        ]
    },
    'pvagr': {
        description: '',
        values: [
            ['ev', ''],
            ['mv', ''],
            ['met-t', '']
        ]
    },
    'pvtijd': {
        description: '',
        values: [
            ['tgw', ''],
            ['verl', ''],
            ['conj', '']
        ]
    },
    'refl': { description: '', values: [] },
    'rel': {
        description: 'Dependency relation',
        values: [
            ['app', 'apposition'],
            ['body', 'body (with complementizer)'],
            ['cmp', 'complementizer'],
            ['cnj', 'conjunct'],
            ['crd', 'coordinator'],
            ['det', 'determiner'],
            ['dlink', 'discourse-link'],
            ['dp', 'discourse-part'],
            ['hd', 'head'],
            ['hdf', 'closing element of a circumposition'],
            ['ld', 'locative or directional complement'],
            ['me', 'measure phrase complement'],
            ['mod', 'modifier'],
            ['mwp', 'part of a multi-word-unit'],
            ['nucl', 'nucleus discourse unit'],
            ['obcomp', 'object of comparative'],
            ['obj1', 'direct object'],
            ['obj2', 'secondary object (indirect object)'],
            ['pc', 'prepositional complement'],
            ['pobj1', 'provisional direct object'],
            ['predc', 'predicative complement'],
            ['predm', 'predicative modifier'],
            ['rhd', 'head of a relative clause'],
            ['sat', 'satellite discourse unit'],
            ['se', 'inherently reflexive complement'],
            ['su', 'subject'],
            ['sup', 'provisional subject'],
            ['svp', 'separable verb particle'],
            ['tag', 'discourse tag'],
            ['vc', 'verbal complement'],
            ['whd', 'head of wh-question'],
            ['--', 'child of a \'top\' node'],
        ]
    },
    'rnum': { description: '', values: [] },
    'root': { description: 'Root form', values: [] },
    'sc': { description: 'Sub-categorization frame', values: [] },
    'sense': { description: 'Word sense', values: [] },
    'special': { description: '', values: [] },
    'spectype': {
        description: '',
        values: [
            ['afgebr', ''],
            ['onverst', ''],
            ['vreemd', ''],
            ['deeleigen', ''],
            ['meta', ''],
            ['comment', ''],
            ['achter', ''],
            ['afk', ''],
            ['symb', ''],
            ['enof', '']
        ]
    },
    'status': {
        description: '',
        values: [
            ['vol', ''],
            ['red', ''],
            ['nadr', '']
        ]
    },
    'stype': { description: '', values: [] },
    'tense': { description: 'Word tense', values: [['past', '']] },
    'vform': { description: '', values: [] },
    'vwtype': {
        description: '',
        values: [
            ['pr', ''],
            ['pers', ''],
            ['refl', ''],
            ['recip', ''],
            ['bez', ''],
            ['vb', ''],
            ['vrag', ''],
            ['betr', ''],
            ['excl', ''],
            ['aanw', ''],
            ['onbep', '']
        ]
    },
    'vztype': {
        description: '',
        values: [
            ['init', ''],
            ['versm', ''],
            ['fin', '']
        ]
    },
    'wh': {
        description: 'Question word',
        values: [
            ['ywh', ''],
            ['nwh', ''],
            ['rwh', ''],
            ['wh', ''],
            ['rel', '']
        ]
    },
    'wk': { description: '', values: [] },
    'word': { description: 'Surface form', values: [] },
    'word_is_': { description: '', values: [] },
    'wvorm': {
        description: '',
        values: [
            ['pv', ''],
            ['inf', ''],
            ['od', ''],
            ['vd', '']
        ]
    },
};
