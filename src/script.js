import GrooveMock from "./scripts/GrooveMock.js";

const GrooveMockInstance = !window.Groove
window.GrooveMockInstance = GrooveMockInstance
if (GrooveMockInstance) {
    window.Groove = new GrooveMock("./mock/apps.json")
    document.body.classList.add("groove-mock")
}
import startUpSequence from "./scripts/startUpSequence";
import jQuery from "jquery";
window.$ = jQuery
import appTransition from "./scripts/appTransition.js";
import clickDetectorConfig from "./scripts/clickDetector.js";
import { GrooveScroll, GrooveSlide } from "./scripts/overscrollFramework.js";
import { boardMethods } from "./scripts/GrooveBoard";
import imageStore from "./scripts/imageStore.js";
import detectDeviceType from "./scripts/detectDeviceType";
import GrooveBoard from "./scripts/GrooveBoard";
import iconPackConverter from "./scripts/iconPack.js";
import "./scripts/pages/appList.js"
import "./scripts/pages/tileList.js"
import { normalize } from 'normalize-diacritics-es';
import { grooveThemes } from "./scripts/GrooveProperties.js";
import applyOverscroll from "./scripts/overscrollFramework.js";
window.normalizeDiacritics = (input = "") => {
    return normalize(input)
}
import BScroll from "better-scroll";

window.imageStore = imageStore

var allappsarchive = []
window["allappsarchive"] = allappsarchive

window.appTransition = appTransition
window.GrooveBoard = GrooveBoard
const scrollers = {
    main_home_scroller: new GrooveSlide('#main-home-slider', {
        scrollX: true,
        scrollY: false
    }),
    tile_page_scroller: new GrooveScroll('#main-home-slider > div > div:nth-child(1) > div.inner-page', {
        scrollX: false,
        scrollY: true,
        mouseWheel: true,
    }),
    app_page_scroller: new GrooveScroll('#main-home-slider > div > div:nth-child(2) > div > div.app-list', {
        scrollX: false,
        scrollY: true,
        mouseWheel: true,
        scrollbar: true
    }),
    letter_selector_scroller: new GrooveScroll('div.letter-selector', {
        scrollX: false,
        scrollY: true,
        mouseWheel: true,
    }),
}

window.scrollers = scrollers

window.console.image = function (url, size = 100) {
    if (typeof url == "string") {
        const image = url
        var style = [
            'font-size: 1px;',
            'padding: ' + this.height / 100 * size + 'px ' + this.width / 100 * size + 'px;',
            'background: url(' + url + ') no-repeat;',
            'background-size: contain;'
        ].join(' ');
        console.log('%c ', style);
    } else {
        const image = new Image();
        image.src = url;
        image.onload = function () {
            var style = [
                'font-size: 1px;',
                'padding: ' + this.height / 100 * size + 'px ' + this.width / 100 * size + 'px;',
                'background: url(' + url + ') no-repeat;',
                'background-size: contain;'
            ].join(' ');
            console.log('%c ', style);
        };
    }
};

$(window).on("systemInsetsChange", function () {
    GrooveBoard.backendMethods.refreshInsets()
})
GrooveBoard.backendMethods.refreshInsets()
$(window).on("resize", () => {
    $(":root").css({ "--window-width": window.innerWidth + "px", "--window-height": window.innerHeight + "px", "--window-hypotenuse": (Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2))) + "px" })
})
$(":root").css({ "--window-width": window.innerWidth + "px", "--window-height": window.innerHeight + "px", "--window-hypotenuse": (Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2))) + "px" })

scrollers.main_home_scroller.on("slideWillChange", function (e) {
    if (e.pageX == 0) {
        if (GrooveBoard.backendMethods.navigation.lastPush.change == "appMenuOpened") {
            GrooveBoard.backendMethods.navigation.back()
        }
    } else {
        GrooveBoard.backendMethods.navigation.push("appMenuOpened", () => { }, () => {
            scrollers.main_home_scroller.scrollTo(0, 0, 500)
        })
    }
})


function getRandomMultiplier() {
    // Returns -1, 0, or 1
    return Math.floor(Math.random() * 3) - 1;
}

function createShakeKeyframes(n) {
    const firsttwo = [getRandomMultiplier(), getRandomMultiplier()]
    return `
        @keyframes home-edit-mode-shake${n} {
            0% {
                transform: scale(var(--shake-scale-distance)) translate(calc(${firsttwo[0]} * var(--shake-distance)), calc(${firsttwo[1]} * var(--shake-distance)));
            }
            33% {
                transform: scale(var(--shake-scale-distance)) translate(calc(${getRandomMultiplier()} * var(--shake-distance)), calc(${getRandomMultiplier()} * var(--shake-distance)));
            }
            66% {
                transform: scale(var(--shake-scale-distance)) translate(calc(${getRandomMultiplier()} * var(--shake-distance)), calc(${getRandomMultiplier()} * var(--shake-distance)));
            }
            100% {
                transform: scale(var(--shake-scale-distance)) translate(calc(${firsttwo[0]} * var(--shake-distance)), calc(${firsttwo[1]} * var(--shake-distance)));
            }
        }
    `;
}

function generateShakeAnimations() {
    return
    document.querySelectorAll("style.shake-anim-styles").forEach(i => i.remove())

    const styleSheet = document.createElement('style');
    styleSheet.classList.add("shake-anim-styles")
    document.head.appendChild(styleSheet);
    $("div.groove-home-tile").each((index, element) => {
        element.style.setProperty("--shake-duration", (Math.floor(Math.random() * 6) + 3) + "s")
    })
    for (let i = 0; i <= 5; i++) {

        const keyframes = createShakeKeyframes(i);

        styleSheet.innerHTML += keyframes;
    }
}

window.generateShakeAnimations = generateShakeAnimations

window.addEventListener("activityPause", () => {
    clearTimeout(window.appTransitionLaunchError)
    document.body.style.visibility = "hidden"
})
window.addEventListener("activityResume", () => {
    setTimeout(() => {
        document.body.style.removeProperty("visibility")
        appTransition.onResume()

    }, 200);
})


requestAnimationFrame(() => {
    startUpSequence([
        (next) => {
            if (GrooveBoard.backendMethods.setupNeeded()) {
                location.href = !GrooveMockInstance ? '/assets/welcome.html' : '/www/welcome.html'
            } else {
                next()
            }
        },
        (next) => {
            GrooveBoard.backendMethods.reloadAppDatabase()
            next()
        },
        (next) => {
            window.iconPackDB = {}
            iconPackConverter.forEach(icon => {
                icon.apps.forEach(packageName => {
                    window.iconPackDB[packageName] = { icon: icon.icon, accent: icon["accent"] }
                });
            });
            next()
        },
        /*    (next) => {
        
                GrooveBoard.alert(
                    "Warning!",
                    "WebView you are using is old/unsupported!",
                    [{ title: "Ok", style: "default", action: next }]
                );
        
            },*/
        (next) => {
            //Load customization
            if (!!localStorage.getItem("tileColumns")) GrooveBoard.backendMethods.setTileColumns(Number(localStorage.getItem("tileColumns")), true)
            if (!!localStorage.getItem("theme")) GrooveBoard.backendMethods.setTheme(Number(localStorage.getItem("theme")), true)
            if (!!localStorage.getItem("accentColor")) GrooveBoard.backendMethods.setAccentColor(localStorage.getItem("accentColor"), true)
            if (!!localStorage.getItem("reducedMotion")) GrooveBoard.backendMethods.setReduceMotion(localStorage.getItem("reducedMotion") == "true", true)
            if (!!localStorage.getItem("UIScale")) GrooveBoard.backendMethods.setUIScale(Number(localStorage.getItem("UIScale")), true)
            if (!!localStorage.getItem("font")) GrooveBoard.backendMethods.font.set(localStorage.getItem("font"), true)
            //if (!!localStorage.getItem("packageManagerProvider")) GrooveBoard.backendMethods.packageManagerProvider.set(Number(localStorage.getItem("packageManagerProvider")), true)
            next()
        },
        (next) => {
            GrooveBoard.backendMethods.navigation.push("homescreen", () => { }, () => { })
            if (Groove.constructor.toString().includes("GrooveMock")) {
                setTimeout(next, 500);
            } else {
                next()
            }
        },
        (next) => {
            detectDeviceType();
            GrooveBoard.backendMethods.reloadApps()
            window.scrollers.tile_page_scroller.refresh()
            window.scrollers.app_page_scroller.refresh()
            next()
        },
        (next) => {
            const letter_selector_entries = ["#abcdefghijklmnopqrstuvwxyz"]
            const groupedEntries = [];
            for (let i = 0; i < letter_selector_entries[0].length; i += 4) {
                groupedEntries.push(letter_selector_entries[0].slice(i, i + 4));
            }
            const letterSelectorDiv = $('.letter-selector > div');
            groupedEntries.forEach(group => {
                const $rowDiv = $('<div>', { class: 'letter-selector-row' });
                for (let letter of group) {
                    const $letterDiv = $('<div>', { class: 'letter-selector-letter', text: letter });
                    $rowDiv.append($letterDiv);
                }
                letterSelectorDiv.append($rowDiv);
            });
            next()
        },
        (next) => {
            try {
                GrooveBoard.backendMethods.homeConfiguration.load()
            } catch (error) {
                alert("Your home screen was reset because of a fatal error :( Please report this:\n" + error.message)
            }
            next()
        },
        async (next) => {
            const wallpaper = await imageStore.hasImage("wallpaper")
            if (wallpaper) {
                GrooveBoard.backendMethods.wallpaper.loadBlob(await imageStore.loadImage("wallpaper"))
            }
            next()
        }
    ],
        function () {
            GrooveBoard.boardMethods.finishLoading()
        }
    )
})