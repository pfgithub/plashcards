// audio player
// requestAnimationFrame loop:
// - get current audio time
// - draw canvas
// avg of the onkeydowns for the keys in the phrase are when the timing points
// are for

// time w/:
// - bpm
// - offset

const cleanup_handlers = [];

const alcanvas = document.getElementById("alcanvas");
alcanvas.width = 800;
alcanvas.height = 200;

let state = {
    level: "-NEORlyRLnRYYs_ka_Gm",
};
function getlevel() {
    return maps_all_audiolevels[state.level];
}
// createSignal("[level id]") // then watch it to update the video player and
// load the map and whatever

/**
 * @type CanvasRenderingContext2D
 */
const alctx = alcanvas.getContext("2d");

const tapbpminput = document.getElementById("tap_bpm");
// in the future, we could display all the taps on a chart:
// y axis: bpm since last note
// x axis: time
// and then we can show the estimated bpm as a horizontal line
// and it would make it very clear if eg the bpm switches in the song

// TODO: only register this once
let player = null;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: getlevel().yt_vid_id,
        playerVars: {
            'playsinline': 1
        },
        events: {
        }
    });
}

const statusline = document.getElementById("ctime");

let gl_running = null;
function gogameloop() {
    if(gl_running != null) return; // double call?
    gl_running = requestAnimationFrame(() => {
        gl_running = null;
        try {
            gameloop();
        }catch(e) {
            statusline.textContent = "error: "+e.toString()+"; click to try again.";
            statusline.addEventListener("click", () => {
                statusline.textContent = "retry…";
                setTimeout(() => gogameloop(), 100);
            }, {once: true});
            return; // pause the loop
        }
        gogameloop();
    });
}
function stopgameloop() {
    if(gl_running != null) {
        cancelAnimationFrame(gl_running);
        gl_running = null;
    }
}

function gameloop() {
    if(player?.getCurrentTime == null) {
        statusline.textContent = "---";
        alcanvas.classList.add("hide");
        return;
    }
    statusline.textContent = "ready";

    const ctime = player.getCurrentTime();
    alcanvas.classList.remove("hide");

    alctx.fillStyle = "#111";
    alctx.fillRect(0, 0, alcanvas.width, alcanvas.height);

    alctx.fillStyle = "#fff";
    alctx.textBaseline = "hanging";
    alctx.font = "10px sans-serif";
    alctx.fillText("" + ctime, 5, 5);
    alctx.fillText("" + keypresses.length, 5, 15);
    alctx.fillText("beat: " + secToBeat(getlevel(), ctime), 5, 45);

    if(keypresses.length >= 2) {
        const {m, b} = findLineByLeastSquares(keypresses, keypresses.map((_, i) => i));
        // x : sec
        // y : beat
        // m = y/x : beats per second
        // (beats / sec) × (60 sec / min) = (beats / min)
        const bpm = m * 60;
        const start_sec = -b/m;
        
        alctx.fillText("bpm: " + bpm, 5, 25);
        alctx.fillText("start: " + start_sec, 5, 35);
    }

    alctx.scale(alcanvas.width, alcanvas.height);
    rendergame(ctime);
    alctx.setTransform(1, 0, 0, 1, 0, 0);
}

const speed = 1 / 0.5; // seconds per screenspace
const endline_pos = 0.1; // screenspace
const note_width = 0.003;
function screenspaceToSec(ctime, screenspace) {
    return ((screenspace - endline_pos) * speed) + ctime;
}
function secToScreenspace(ctime, sec) {
    // sec * (screenspace / sec);
    return ((sec - ctime) / speed) + endline_pos;
}

function rendergame(ctime) {
    alctx.fillStyle = "#fff";
    alctx.fillRect(0.1, 0, 0.003, 1.0);

    alctx.fillStyle = "#aaa";

    const range_start = screenspaceToSec(ctime, -0.5);
    const range_end = screenspaceToSec(ctime, 1 + 0.5);

    // bpm markers:
    const beat_start = secToBeat(getlevel(), range_start);
    const beat_end = secToBeat(getlevel(), range_end);
    const show_beats = 4;
    for(let cbeat = Math.ceil(beat_start / show_beats) * show_beats; cbeat < beat_end; cbeat += show_beats) {
        alctx.fillStyle = "#666";
        const notepos = secToScreenspace(ctime, beatToSec(getlevel(), cbeat));
        alctx.fillRect(notepos, 0, note_width, 1.0);
    }

    // if we are going to have millions of notes, maybe do a binary search for these or cache between frames.
    // shouldn't matter at our scale though.
    const notes_in_range = getlevel().notes.filter(note => note.sec >= range_start && note.sec <= range_end);
    for(const note of notes_in_range) {
        alctx.fillStyle = "#aaa";

        const notepos = secToScreenspace(ctime, note.sec);
        alctx.fillRect(notepos, 0, note_width, 0.4);
        alctx.fillRect(notepos, 0.6, note_width, 0.4);

        alctx.save();
        alctx.setTransform(1, 0, 0, 1, 0, 0);
        alctx.fillStyle = "#fff";
        alctx.textBaseline = "middle";
        alctx.font = "20px sans-serif";
        alctx.fillText(note.word, notepos * alcanvas.width, alcanvas.height / 2);
        alctx.restore();
    }
}

let keypresses = [];
const tapbpminputonkeydown = e => {
    e.preventDefault();
    tapbpminput.value = "";

    const ctime = player?.getCurrentTime();
    if(ctime == null) return;
    keypresses.push(ctime);
};
tapbpminput.addEventListener("keydown", tapbpminputonkeydown);
cleanup_handlers.push(() => {
    tapbpminput.removeEventListener("keydown", tapbpminputonkeydown);
});



gogameloop();
cleanup_handlers(() => stopgameloop());

// hmm we should make this hot reload
// just have to register cleanup handlers
function docleanup() {
    cleanup_handlers.forEach(ch => ch());
}