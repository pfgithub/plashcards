// https://thread.pfg.pw/#reddit/r/Plover/comments/gouvfs/vowels_according_to_learn_plover/
// looks like the plover dictionary is british english
// I don't know british english
// // AO: /ʊ/ ⟨book⟩, /ɔ/ ⟨floor⟩, /uː/ ⟨pool⟩
// I'll have to pick one of those to use instead of '{oo}'
// 'ooh' is 'uː'
// alternatively, we use a different symbol entirely

// also we could consider ignoring plover's default dictionary and using
// a purely ipa mapping thing, and then display the pronounced ipa from the song
// - probably more useful to use the default dictionary

// ok so here's an option
// can we just put in the text. eg for 'I' write 'EU'
// - not sure if I'd rather learn 'I' or 'EU' to press 'EU'. I think I'd rather learn 'I'.
// - not sure

// '{EYE}' (AOEU) → 'aɪ'
// '{OO}' (AO) → TBD
// '{EE}' → 'iː'

// '{th}' (th) → 'þ'
// '{sh}' (sh) → 'ʃ'
// '{ch}' (ch) → 'tʃ' maybe?

const maps_all_audiolevels = {
    '-NEORlyRLnRYYs_ka_Gm': (() => {
        const cfg = {
            bpm: 154, // 153.96732670604476
            start_offset: 3.3469757692328486,
        };
        return {
            title: "Dynasties & Dystopia",
            yt_vid_id: "y_fB0IMbq54",
            ...cfg,
            notes: [
                ...autonotes({
                    ...cfg,
                }, [
                    // first is the displayed stroke, second is alternate
                    [24, "{OO}", "{OO}*"], // * is for disambiguation, otherwise it just puts 'oo'. but this is a game, we don't care about disambiguation.
                    [25, "yE", "E"],
                    [25.5, "hE"],
                    [26, "mAD"],
                    [27, "{EYE}M"],
                    [27.5, "raK"],
                    [28, "-G"],
                    [29, "wh{EYE}T"],
                    [30, "d{EYE}"], // alt: d{EYE}MDZ in one stroke but it's nice to split for the song
                    [31, "mONDZ"],
                    [32, "{th}r{OW}", "{th}r{OH}"],
                    [32.5, "m{EE}", "mE"],
                    [33, "-T", "-LT", "-TD", "-TS", "tT"],
                    [34, "sk{EYE}"],
                    [35, "u"],
                    [35.5, "wO", "w{OW}LD", "-LD"],
                    [36, "sw{AE}R", "sw{AA}R"],
                    [36.5, "-T", "-LT", "-TD", "-TS", "tT"],
                    [37, "sUN"],
                    [38, "{sh}{EYE}N"],
                    [39, "-G"],
                    
                    /*
                    copy([NOTES].map(v => [v[0]+(39-24)+1, ...v.slice(1)]).map(l => JSON.stringify(l)+",").join("\n"))
                    */
                    [40,"{OO}","{OO}*"],
                    [41,"yE","E"],
                    [41.5,"hE"],
                    [42,"mAD"],
                    [43,"{EYE}M"],
                    [43.5,"raK"],
                    [44,"-G"],
                    [45,"wh{EYE}T"],
                    [46,"d{EYE}"],
                    [47,"mONDZ"],
                    [48,"{th}r{OW}","{th}r{OH}"],
                    [48.5,"m{EE}","mE"],
                    [49,"-T","-LT","-TD","-TS","tT"],
                    [50,"sk{EYE}"],
                    [51,"u"],
                    [51.5,"wO","w{OW}LD","-LD"],
                    [52,"sw{AE}R","sw{AA}R"],
                    [52.5,"-T","-LT","-TD","-TS","tT"],
                    [53,"sUN"],
                    [54,"{sh}{EYE}N"],

                    [55,"n"],
                    [55.5,"{th}","{th}{SH}{ION}"],
                    [56, "g{OO}T"],
                    [56.5, "IK"],
                    [57, "UND"],
                    // [57.5, ""] // we're missing a syllable. we have 'und·r·ground', missing the '·r·'
                    [58, "gr{OW}ND"],
                    [59, "sIT"],
                    [59.5, "TI", "yI"],
                    [60.5, "w{EE}", "wE"],
                    [61, "{AW}L"],
                    [62, "sIN"],
                    [63, "f"],
                    [63.5, "I", "{EYE}"], // is '{EYE}' more accurate? maybe but it prints 'eye' so I'll put it second
                    [64, "brI", "brING"], // why not 'br-G'? apparently it's short for 'being'
                    [64.5, "A"],
                    [65, "kUP", "k{OW}P"],
                    [65.5, "-L", "*L"],
                    [66, "r{OW}NDZ"], // alt we can do r{OW}ND / -S or r{OW}ND / -Z
                    [67, "w"],
                    [67.5, "m{EE}", "mE"],
                    [68, "{th}EN"],
                    [68.5, "w{EE}", "wE"],
                    [69, "{AW}L"],
                    [70, "wIN"],
                    [71, "I", "{EYE}"],
                    [71.5, "k{AA}M"],
                    [72, "bAK"],
                    [72.5, "-ND", "AND"],
                    [73, "br{AW}T", "br{OW}T", "br{AW}GT"],
                    [73.5, "-T", "-LT", "-TD", "-TS", "tT"],
                    [74, "kr{OW}N"],
                    [75, "w"],
                    [75.5, "m{EE}", "mE"],
                    [76, "{th}EN"],
                    [76.5, "-T", "-LT", "-TD", "-TS", "tT"],
                    [77, "kING"], // 's? no? nvm
                    [78, "dEN"],
                    [79, "brAEK", "prAEK"],
                    [79.5, "y{OH}"],
                    [80, "nEX"],
                    [80.5, "yUS"],
                    [81, "-ND", "AND"],
                    [81.5, "y{OH}"],
                    [82, "nEK"],
                    [82.5, "k{AW}S", "k{AW}Z"],
                    [83, "EFB", "AEF{SH}", "EF{SH}", "EF{SH}G"], // oh goodness. "everybody" is 4 syllables but all the matches are 1 stroke
                    [85, "ON", "OB"],
                    [85.5, "y{OH}"],
                    [86, "hED", "hAED"],

                    // how long did that take? ^^
                    // it's midnight

                    // anyway we can automate lots of this
                    // we have to have:
                    // - the song lyrics
                    // we measure:
                    // - beats per lyric syllable
                    // and write it
                    // then we automatically fill this
                ]),
            ],
        };
    })(),
};

function autonotes(cfg, notes) {
    return notes.map(note => {
        return {sec: beatToSec(cfg, note[0]), word: note[1]};
    });
}

function beatToSec({bpm, start_offset}, beat) {
    // bpm : beats per minute
    // beat * (sec / beat) = sec
    return beat / (bpm * (1 / 60)) + start_offset;
}
function secToBeat({bpm, start_offset}, sec) {
    return (sec - start_offset) * (bpm * (1 / 60));
}