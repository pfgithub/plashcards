/*
target is:
1. learning the position of all the keys
2. starting to do some multi-letter words
3. learning all the chords
4. try music but just the first letter of each lyric
5. starting to do some words incl chords
6. being able to type any word pretty quickly given its text form
   (* the text form uses 'i' instead of 'eu', it should be phonetic=readable but not english)
7. starting to try out timing words to music lyrics (the phonetic form of the word is shown
    and helper positioning for timing)

! during this process, we should learn to both read and write. both are important.

helpful resources:

// https://plover.goeswhere.com/#amazing
// https://docs.google.com/drawings/d/1Yi93aHaxe3L-_ePtq3bujv7o1CCLmmgim8iuL_Sx2IY/edit

*/

const sel_level_menu = document.getElementById("sel_level");
const out_div = document.getElementById("out");
const in_input = document.getElementById("in");
const out_div_2 = document.getElementById("out2");
const kbd = document.getElementById("keyboard");

function fancylevelname(index, level) {
    return "" + ("" + (index + 1)).padStart(2, "0") + " - " + level.name;
}
function startsellevel() {
    for(const [i, level] of levels.entries()) {
        const option = document.createElement("option");
        option.value = "" + i;
        option.text = fancylevelname(i, level);
        sel_level_menu.appendChild(option);
    }
    sel_level_menu.value = localStorage.getItem("--current-level") ?? "0";
    sel_level_menu.onchange = chg => {
        localStorage.setItem("--current-level", chg.currentTarget.value);
        resetlevel();
    }
}
function currentlevelid() {
    return +sel_level_menu.value;
}

const phraseres1 = document.createElement("span");
phraseres1.style.opacity = 0.5;
const pcursor = document.createElement("span");
pcursor.classList.add("pcursor");
const pcursor2 = document.createElement("div");
const phraseres2 = document.createElement("span");
out_div.appendChild(phraseres1);
pcursor.appendChild(pcursor2);
out_div.appendChild(pcursor);
out_div.appendChild(phraseres2);

/*
questions:
h1: stphskwr, sh, th, n, v, z, j, y, g, r, d, ch, b, l, m
v: aoeu, aw, ā, ī, ea, oo, oa, ē, ew, ow, ō, oi, i
h2: fpltdrbgsz, v, s2(=f), ing, th, lk, mp, nk, ng, ch, n, m, lch, lj, rch, nch, j, sh, rv, kshun, k, shun
*/

function expandword(word) {
    // 'I' => 'EU'
}
function randsel(arr) {
    return arr[Math.random() * arr.length |0];
}
// would be nice to put a uuid with each of these
const levels = [
    {
        name: "stkp",
        desc: "learn the s, t, k, and p keys",
        cb: () => new Set([randsel([..."stkp"])]),
    },
    {
        name: "whr",
        cb: () => new Set([randsel([..."whr"])]),
    },
    {
        name: "AOEU",
        cb: () => new Set([randsel([..."AOEU"])]),
    },
    {
        name: "FRPB",
        cb: () => new Set([randsel([..."FRPB"])]),
    },
    {
        name: "LGTS",
        cb: () => new Set([randsel([..."LGTS"])]),
    },
    {
        name: "DZ",
        cb: () => new Set([randsel([..."DZ"])]),
    },
];
function clevelWord() {
    let clevel = currentlevelid();
    while(clevel > 0) {
        if(Math.random() < 0.5) {
            clevel -= 1;
        }else break;
    }
    const goalsel = levels[clevel];
    return goalsel.cb();
}
function clevelPhrase() {
    return new Array(20).fill(0).map(itm => clevelWord());
}

let current_goal = [];
let used_goal = [];
let cgs = 0;
function updatephrase() {
    phraseres1.textContent = used_goal.map(setconv).join(" ") + " ";
    phraseres2.textContent = current_goal.map(setconv).join(" ");
    pcursor.style.display = "none"; pcursor.offsetHeight; pcursor.style.display = "";
    // ^ firefox bug workaround
}
function resetlevel() {
    used_goal = [];
    current_goal = clevelPhrase();
    updatephrase();
    cgs = 0;
}

function seteq(a, b) {
    return a.size === b.size && [...a].every(itm => b.has(itm));
}
function flattenGoalSet(gs) {
    return gs; // todo; this is where we convert special things
    // like 'sh' / 'th' / 'n' / … to 'SH' / 'TH' / 'TPH' / …
}

async function game() {
    // generate a phrase. ie
    // "s k t a r s k"
    while(true) {
        if(current_goal.length === 0) {
            const now = Date.now();
            const diff = now - cgs;
            if(cgs !== 0) {
                const clid = currentlevelid();
                const clevel = levels[clid];
                // we could analyze ms for each keypress even if we wanted (excl the first)
                const lcmsg = "level ["+fancylevelname(clid, clevel)+"] in ["+Math.round(diff / (used_goal.length - 1))+"]ms/c phrase ["+used_goal.map(setconv).join(" ")+"]";
                localStorage.setItem("--score-"+Date.now(), lcmsg);
                print(lcmsg);
            }
            resetlevel();
        }
        const tires = await textinput();
        if(seteq(tires, flattenGoalSet(current_goal[0]))) {
            const shres = current_goal.shift();
            if(!seteq(shres, new Set(["*"]))) used_goal.push(shres);
            updatephrase();
            if(cgs == 0) cgs = Date.now();
        }else if(seteq(tires, new Set(["*"]))) {
            const ug0 = used_goal.pop();
            if(ug0 != null) current_goal.unshift(ug0);
            updatephrase();
        }else{
            current_goal.unshift(new Set(["*"]));
            updatephrase();
        }
    }
}

// for goals, we're going to put the meaning and not the letters
// ie: we would put "hi" instead of "heu". you learn "i" = "eu"
// we put keyboard keys still, not 

function kconv(key) {
    return {
        'KeyQ': "s",
        'KeyA': "s",
        'KeyW': "t",
        'KeyS': "k",
        'KeyE': "p",
        'KeyD': "w",
        'KeyR': "h",
        'KeyF': "r",

        'KeyT': "*",
        'KeyY': "*",
        'KeyG': "*",
        'KeyH': "*",

        'KeyC': "A",
        'KeyV': "O",
        'KeyN': "E",
        'KeyM': "U",

        'KeyU': "F",
        'KeyI': "P",
        'KeyO': "L",
        'KeyP': "T",
        'BracketLeft': "D",
        'KeyJ': "R",
        'KeyK': "B",
        'KeyL': "G",
        'Semicolon': "S",
        'Quote': "Z",
    }[key];
}

// we need a one at a time mode
// on android, every key is 'Process' - you need to listen to the IME events
// or BeforeInput or whatever

// alternatively, we display our own virtual keyboard

let current_held = new Set();
let current_input = new Set();
in_input.onkeydown = (k) => {
    k.preventDefault();
    current_held.add(k.code);
    const kres = kconv(k.code);
    if(kres != null) current_input.add(kres);
    updateinput();
}
document.onkeyup = (k) => {
    current_held.delete(k.code);
    updateinput();
    if(current_held.size === 0 && current_input.size >= 1) {
        sendheld();
    }
}
in_input.onfocus = () => {
    kbd.classList.toggle("hide", true);
};
in_input.onblur = () => {
    kbd.classList.toggle("hide", false);
    current_held = new Set(); current_input = new Set(); updateinput();
}
let kbd_autocommit = -1;
function startAutocommit() {
    cancelAutocommit();
    kbd_autocommit = setTimeout(() => {
        kbd_autocommit = -1;

        if(current_input.size > 0) {
            sendheld();
            clickvibrate();
        }
    }, 200);
}
function cancelAutocommit() {
    if(kbd_autocommit != -1) {
        clearTimeout(kbd_autocommit);
        kbd_autocommit = -1;
    }
}
function clickvibrate() {
    navigator.vibrate(0);
    navigator.vibrate(1);
}
kbd.onpointerdown = e => {
    /**
     * @type HTMLElement
     */
    let q = e.target;
    while(!q.hasAttribute("data-key")) {
        q = q.parentElement;
        if(q == null) return;
        if(q === kbd) return;
    }

    clickvibrate();

    const datakey = q.getAttribute("data-key");
    if(datakey === "_SEND") {
        cancelAutocommit();
        if(current_input.size > 0) {
            sendheld();
        }
    }else{
        current_input.add(datakey);
        updateinput();
        startAutocommit();
    }
}

function setconv(set) {
    const res = [..."stkpwhr*AOEU"].filter(itm => set.has(itm)).join("");
    const rhsres = [..."FRPBLGTSDZ"].filter(itm => set.has(itm)).join("");
    return (res !== "" ? res + rhsres : rhsres !== "" ? "-" + rhsres : "");
}

function updateinput() {
    in_input.value = "["+current_held.size+"] " + setconv(current_input);
}
function sendheld() {
    const cin_set = current_input;
    current_input = new Set();
    updateinput();
    sendtext(cin_set);
}
function print(msg) {
    const divel = document.createElement("div");
    divel.textContent = msg;
    out_div_2.insertBefore(divel, out_div_2.firstChild);
}

let waiting_strs = [];
let waiting_cbs = [];
async function textinput() {
    return await new Promise(r => {
        if(waiting_strs.length !== 0) {
            return r(waiting_strs.shift());
        }
        waiting_cbs.push(r);
    })
}
function sendtext(msg) {
    const wcb0 = waiting_cbs.shift();
    if(wcb0 != null) wcb0(msg);
    else waiting_strs.push(msg);
}

startsellevel();
updateinput();
updatephrase();
game().then(() => {}).catch(e => {
    print("error: " + e.toString());
});