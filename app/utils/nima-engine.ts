import type { NimaEngineConfig, NimaTargetSelectorType, NimaTriggerConfig } from "nimajs"

/* END_IMPORTS */

export function loadNimaEngine() {
    /* Initialize Engine Config */
    const config: NimaEngineConfig = {
        animations: [
            {
name: 'theme',
triggerMode: 'overlap',
triggers: [
{
uid: 'd32d96',
startTrigger: {
event: 'mouseenter',
target: 'self',
tests: [
],
},
endTriggers: [
{
event: 'mouseleave',
target: 'self',
tests: [
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
{
uid: '202902',
target: 'descendant',
selector: '.theme-button',
value: 100,
},
],
randoms: [
],
},
{
uid: '2df533',
startTrigger: {
event: 'mouseleave',
target: 'self',
tests: [
],
},
endTriggers: [
{
event: 'mouseenter',
target: 'self',
tests: [
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
],
},
{
name: 'input-box',
triggerMode: 'overlap',
triggers: [
{
uid: '588f43',
startTrigger: {
event: 'focus',
target: 'child',
selector: '.input',
tests: [
],
},
endTriggers: [
{
event: 'blur',
target: 'child',
selector: '.input',
tests: [
{
target: "child",
selector: ".input",
fn: (el) => el?.value === "",
},
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
{
uid: '6f6e4b',
startTrigger: {
event: 'timer',
target: 'child',
selector: '.input',
timerData: 100,
tests: [
{
target: "child",
selector: ".input",
fn: function(el){ return el.value.length !== 0 },
},
],
},
endTriggers: [
{
event: 'blur',
target: 'child',
selector: '.input',
tests: [
{
target: "child",
selector: ".input",
fn: (el) => el?.value === "",
},
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
{
uid: '4096bc',
startTrigger: {
event: 'blur',
target: 'child',
selector: '.input',
tests: [
{
target: "child",
selector: ".input",
fn: (el) => el?.value === "",
},
],
},
endTriggers: [
{
event: 'focus',
target: 'child',
selector: '.input',
tests: [
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
],
},
{
name: 'button',
triggerMode: 'overlap',
triggers: [
{
uid: '0f72bd',
startTrigger: {
event: 'mouseenter',
target: 'self',
tests: [
],
},
endTriggers: [
{
event: 'mouseleave',
target: 'self',
tests: [
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
{
uid: '914513',
startTrigger: {
event: 'click',
target: 'self',
tests: [
],
},
endTriggers: [
{
event: 'timer',
target: 'self',
timerData: 200,
tests: [
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
{
uid: '099089',
startTrigger: {
event: 'mouseleave',
target: 'self',
tests: [
],
},
endTriggers: [
{
event: 'mouseenter',
target: 'self',
tests: [
],
},
],
pauseTriggers: [
],
resumeTriggers: [
],
staggers: [
],
randoms: [
],
},
],
},

        ],
    }

    /* Initialize Stylesheet */
    const nimaStyles = `:root {
--nima-translate-x: 0px;
--nima-translate-y: 0px;
--nm-p-d32d96: running;
--nm-p-2df533: running;
--nm-p-588f43: running;
--nm-p-6f6e4b: running;
--nm-p-4096bc: running;
--nm-p-0f72bd: running;
--nm-p-914513: running;
--nm-p-099089: running;
--nm-d-202902: 0s;
}
@keyframes nm-k-202902 {
0% {
opacity: 0;
}
100% {
opacity: 1;
}
}
@keyframes nm-k-dedbd8 {
to {
height: clamp(8rem,calc(7rem + 6vw),11rem);
}
}
@keyframes nm-k-54610f {
0% {
opacity: 1;
}
100% {
opacity: 0;
}
}
@keyframes nm-k-bc7ae7 {
from {
height: clamp(8rem,calc(7rem + 6vw),11rem);
}
}
@keyframes nm-k-4b1267 {
to {
translate: -20% -100%;
}
}
@keyframes nm-k-ee0937 {
to {
scale: 85%;
}
}
@keyframes nm-k-64c9d7 {
to {
translate: -20% -100%;
}
}
@keyframes nm-k-51e3e4 {
to {
scale: 85%;
}
}
@keyframes nm-k-10fcd2 {
from {
translate: -20% -100%;
}
}
@keyframes nm-k-c3f93d {
from {
scale: 85%;
}
}
@keyframes nm-k-2f45c7 {
0% {
scale: 1;
}
100% {
scale: 1.1;
}
}
@keyframes nm-k-6cda91 {
0% {
scale: 1.1;
}
50% {
scale: 1.2;
}
100% {
scale: 1.1;
}
}
@keyframes nm-k-3a786e {
0% {
scale: 1.1;
}
100% {
scale: 1;
}
}
.nima-theme .theme-button {
--nm-a-d32d96: 200ms calc(var(--nm-d-202902) + 500ms) 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-d32d96) nm-k-202902;
--nm-a-2df533: 200ms 0s 1 ease-in-out normal forwards var(--nm-p-2df533) nm-k-54610f
}
.nima-theme.nm-a-d32d96 .theme-button {
animation: var(--nm-a-d32d96)
}
.nima-theme.nm-a-d32d96.nm-a-2df533 .theme-button {
animation: var(--nm-a-d32d96),var(--nm-a-2df533)
}
.nima-theme.nm-a-2df533 .theme-button {
animation: var(--nm-a-2df533)
}
.nima-theme .slider {
--nm-a-d32d96: 500ms 0s 1 ease-in-out normal forwards var(--nm-p-d32d96) nm-k-dedbd8;
--nm-a-2df533: 500ms 0s 1 ease-in-out normal forwards var(--nm-p-2df533) nm-k-bc7ae7
}
.nima-theme.nm-a-d32d96 .slider {
animation: var(--nm-a-d32d96)
}
.nima-theme.nm-a-d32d96.nm-a-2df533 .slider {
animation: var(--nm-a-d32d96),var(--nm-a-2df533)
}
.nima-theme.nm-a-2df533 .slider {
animation: var(--nm-a-2df533)
}
.nima-input-box > .placeholder {
--nm-a-588f43: 500ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-588f43) nm-k-4b1267,500ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-588f43) nm-k-ee0937;
--nm-a-6f6e4b: 500ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-6f6e4b) nm-k-64c9d7,500ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-6f6e4b) nm-k-51e3e4;
--nm-a-4096bc: 500ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-4096bc) nm-k-10fcd2,500ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-4096bc) nm-k-c3f93d
}
.nima-input-box.nm-a-588f43 > .placeholder {
animation: var(--nm-a-588f43)
}
.nima-input-box.nm-a-588f43.nm-a-6f6e4b > .placeholder {
animation: var(--nm-a-588f43),var(--nm-a-6f6e4b)
}
.nima-input-box.nm-a-588f43.nm-a-6f6e4b.nm-a-4096bc > .placeholder {
animation: var(--nm-a-588f43),var(--nm-a-6f6e4b),var(--nm-a-4096bc)
}
.nima-input-box.nm-a-588f43.nm-a-4096bc > .placeholder {
animation: var(--nm-a-588f43),var(--nm-a-4096bc)
}
.nima-input-box.nm-a-6f6e4b > .placeholder {
animation: var(--nm-a-6f6e4b)
}
.nima-input-box.nm-a-6f6e4b.nm-a-4096bc > .placeholder {
animation: var(--nm-a-6f6e4b),var(--nm-a-4096bc)
}
.nima-input-box.nm-a-4096bc > .placeholder {
animation: var(--nm-a-4096bc)
}
.nima-button {
--nm-a-0f72bd: 300ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-0f72bd) nm-k-2f45c7;
--nm-a-914513: 200ms 0s 1 linear normal none var(--nm-p-914513) nm-k-6cda91;
--nm-a-099089: 300ms 0s 1 cubic-bezier(0.1,-0.3,0.2,1.3) normal forwards var(--nm-p-099089) nm-k-3a786e
}
.nima-button.nm-a-0f72bd {
animation: var(--nm-a-0f72bd)
}
.nima-button.nm-a-0f72bd.nm-a-914513 {
animation: var(--nm-a-0f72bd),var(--nm-a-914513)
}
.nima-button.nm-a-0f72bd.nm-a-914513.nm-a-099089 {
animation: var(--nm-a-0f72bd),var(--nm-a-914513),var(--nm-a-099089)
}
.nima-button.nm-a-0f72bd.nm-a-099089 {
animation: var(--nm-a-0f72bd),var(--nm-a-099089)
}
.nima-button.nm-a-914513 {
animation: var(--nm-a-914513)
}
.nima-button.nm-a-914513.nm-a-099089 {
animation: var(--nm-a-914513),var(--nm-a-099089)
}
.nima-button.nm-a-099089 {
animation: var(--nm-a-099089)
}
`

    /* Only do once, regarless of how many times the document loads */
    if (!document.documentElement.classList.contains("nm-l")) {
        document.documentElement.classList.add("nm-l")

        /* Initialize WeakMap for event listeners */
        let eventListeners: {
            [index: string]: WeakMap<
                object,
                { abort: AbortController; uid: string }
            >
        } = {}
        config.animations.map(
            anim =>
                (eventListeners[anim.name] = new WeakMap<
                    object,
                    { abort: AbortController; uid: string }
                >()),
        )

        /* Inject Styles into head */
        let nimaStyleTag: HTMLStyleElement
        if (!(nimaStyleTag = document.querySelector("style.nm-s")!)) {
            nimaStyleTag = document.createElement("style")
            nimaStyleTag.classList.add("nm-s")
            document.head.appendChild(nimaStyleTag)
        }
        nimaStyleTag.textContent = nimaStyles

        let usedUIDs: string[] = []

        const generateUid = () => {
            let uid
            while (true) {
                const myUid = Math.random().toString(16).slice(2, 8)

                if (!usedUIDs.includes(myUid)) {
                    uid = myUid
                    usedUIDs.push(myUid)
                    break
                }
            }
            return uid
        }

        const getElemsFromSelector = (
            elem: Element,
            nimauid: string,
            targetType: NimaTargetSelectorType,
            targetSelector?: string,
        ) => {
            switch (targetType) {
                case "self": {
                    return [elem]
                }
                case "child": {
                    return document.querySelectorAll(
                        `*[data-nimauid="${nimauid}"] > ${
                            targetSelector || "*"
                        }`,
                    )
                }
                case "descendant": {
                    return document.querySelectorAll(
                        `*[data-nimauid="${nimauid}"] ${targetSelector || "*"}`,
                    )
                }
                case "parent":
                case "ancestor": {
                    return [elem.closest(`${targetSelector || "*"}`) || elem]
                }
                case "sibling": {
                    return document.querySelectorAll(
                        `*[data-nimauid="${nimauid}"] ~ ${
                            targetSelector || "*"
                        }`,
                    )
                }
                case "selector": {
                    return document.querySelectorAll(targetSelector || "*")
                }
                default: {
                    return [elem]
                }
            }
        }

        /* Cycle through elements in the DOM and add event listeners as needed */
        const refreshElems = () => {
            config.animations.map(anim => {
                /* Get all valid Nima animated elements */
                const elements = document.querySelectorAll(
                    `.nima-${anim.name}`,
                ) as NodeListOf<HTMLElement>

                const InitializeElement: (elem: Element) => {
                    abort: AbortController
                    uid: string
                } = elem => {
                    const abort = new AbortController()
                    const uid = generateUid()
                    elem.setAttribute("data-nimauid", uid)

                    eventListeners[anim.name]!.set(elem, { abort, uid })
                    return {
                        abort,
                        uid,
                    }
                }

                /* Cycle through each element */
                elements.forEach(elem => {
                    let nimauid: string
                    let abort: AbortController

                    elem.classList.add(`nm-l-${anim.name}`)

                    if (!eventListeners[anim.name]!.has(elem)) {
                        const res = InitializeElement(elem)

                        nimauid = res.uid
                        abort = res.abort
                    } else {
                        nimauid = eventListeners[anim.name]!.get(elem)!.uid
                        abort = eventListeners[anim.name]!.get(elem)!.abort
                    }

                    /* Cycle through triggers and set event listerns */
                    anim.triggers.map(trigger => {
                        const initializeTrigElems: (
                            trig: NimaTriggerConfig,
                        ) => Element[] | NodeListOf<Element> = trig => {
                            const triggerElems = getElemsFromSelector(
                                elem,
                                nimauid,
                                trig.target,
                                trig.selector,
                            )

                            triggerElems.forEach(trigElem => {
                                if (!eventListeners[anim.name]!.has(trigElem)) {
                                    InitializeElement(trigElem)
                                    abort.signal.addEventListener(
                                        "abort",
                                        () => {
                                            eventListeners[anim.name]!.get(
                                                trigElem,
                                            )!.abort.abort()
                                        },
                                    )
                                }
                            })

                            return triggerElems
                        }

                        const registerEventCallback: (
                            trig: NimaTriggerConfig,
                            callback: () => void,
                            targetElems: Element[] | NodeListOf<Element>,
                            persistent: boolean,
                        ) => void = (
                            trig,
                            callback,
                            targetElems,
                            persistent,
                        ) => {
                            const action = () => {
                                if (trig?.tests?.length) {
                                    let results: boolean[] = []
                                    trig.tests?.map(test => {
                                        const elems = getElemsFromSelector(
                                            elem,
                                            nimauid,
                                            test.target,
                                            test.selector,
                                        )
                                        elems.forEach(el => {
                                            results.push(test.fn(el))
                                        })
                                    })
                                    if (trig.testMode === "ALL") {
                                        if (
                                            results.filter(res => res === false)
                                                .length === 0
                                        ) {
                                            callback()
                                        }
                                    } else {
                                        if (
                                            results.filter(res => res === true)
                                                .length > 0
                                        ) {
                                            callback()
                                        }
                                    }
                                } else {
                                    callback()
                                }
                            }

                            if (trig.event === "animationend") {
                                elem.addEventListener(
                                    "animationend",
                                    () => {
                                        action()
                                    },
                                    {
                                        once: !persistent,
                                        signal: abort.signal,
                                    },
                                )
                            } else if (trig.event === "timer") {
                                setTimeout(
                                    () => {
                                        action()
                                    },
                                    (trig.timerData as number) ?? 500,
                                )
                            } else if (trig.event === "viewportenter") {
                                const callback: IntersectionObserverCallback =
                                    entries => {
                                        entries.map(entry => {
                                            if (entry.isIntersecting) {
                                                action()
                                                !persistent &&
                                                    intobserver.disconnect()
                                            }
                                        })
                                    }
                                const intobserver = new IntersectionObserver(
                                    callback,
                                    {
                                        rootMargin:
                                            `${trig.viewportMargin}` ?? "0px",
                                        threshold: trig.viewportThreshold ?? 0,
                                    },
                                )
                                targetElems.forEach(el => {
                                    intobserver.observe(el)
                                })

                                abort.signal.addEventListener("abort", () =>
                                    intobserver.disconnect(),
                                )
                            } else if (trig.event === "viewportleave") {
                                const callback: IntersectionObserverCallback =
                                    entries => {
                                        entries.map(entry => {
                                            if (!entry.isIntersecting) {
                                                action()
                                                !persistent &&
                                                    intobserver.disconnect()
                                            }
                                        })
                                    }
                                const intobserver = new IntersectionObserver(
                                    callback,
                                    {
                                        rootMargin:
                                            `${trig.viewportMargin}` ?? "0px",
                                        threshold: trig.viewportThreshold ?? 0,
                                    },
                                )
                                targetElems.forEach(el => {
                                    intobserver.observe(el)
                                })

                                abort.signal.addEventListener("abort", () =>
                                    intobserver.disconnect(),
                                )
                            } else {
                                targetElems.forEach(trigElem => {
                                    trigElem.addEventListener(
                                        trig.event,
                                        () => {
                                            action()
                                        },
                                        {
                                            once: !persistent,
                                            signal: eventListeners[
                                                anim.name
                                            ]?.get(trigElem)!.abort.signal,
                                        },
                                    )
                                })
                            }
                        }

                        if (trigger.staggers.length !== 0) {
                            trigger.staggers.map(stagger => {
                                const staggerElems = (
                                    stagger.target === "self"
                                        ? document.querySelectorAll(
                                              `.nima-${anim.name}`,
                                          )
                                        : getElemsFromSelector(
                                              elem,
                                              nimauid,
                                              stagger.target,
                                              stagger.selector,
                                          )
                                ) as NodeListOf<HTMLElement>
                                staggerElems.forEach((el, i) => {
                                    el.style.setProperty(
                                        `--nm-d-${stagger.uid}`,
                                        `${stagger.value * i}ms`,
                                    )
                                })
                            })
                        }

                        if (trigger.randoms.length !== 0) {
                            trigger.randoms.map(random => {
                                const randElems = getElemsFromSelector(
                                    elem,
                                    nimauid,
                                    random.target,
                                    random.selector,
                                ) as NodeListOf<HTMLElement>
                                randElems.forEach(el => {
                                    let res
                                    if (!el.hasAttribute("data-nimauid")) {
                                        res = InitializeElement(el)
                                    } else {
                                        res = eventListeners[anim.name]!.get(el)
                                    }

                                    if (
                                        !el.classList.contains(
                                            `nm-r-${random.randuid}`,
                                        )
                                    ) {
                                        const randomize = () => {
                                            el.style.setProperty(
                                                `--nm-r-${random.randuid}`,
                                                `${
                                                    Math.round(
                                                        (Math.random() *
                                                            (random.max -
                                                                random.min) +
                                                            random.min) /
                                                            random.step,
                                                    ) * random.step
                                                }${random.unit}`,
                                            )
                                        }
                                        randomize()
                                        el.addEventListener(
                                            "animationiteration",
                                            e => {
                                                if (
                                                    `nm-k-${random.motionuid}` ===
                                                    e.animationName
                                                ) {
                                                    randomize()
                                                }
                                            },
                                            {
                                                signal: res!.abort.signal,
                                            },
                                        )
                                        el.classList.add(
                                            `nm-r-${random.randuid}`,
                                        )
                                    }
                                })
                            })
                        }

                        const startTriggerElems = initializeTrigElems(
                            trigger.startTrigger,
                        )
                        if (trigger.startTrigger.event === "load") {
                            elem.classList.add(`nm-a-${trigger.uid}`)
                        } else {
                            registerEventCallback(
                                trigger.startTrigger,
                                () => {
                                    elem.classList.add(`nm-a-${trigger.uid}`)
                                    trigger.endTriggers.map((endTrig, i) => {
                                        registerEventCallback(
                                            endTrig,
                                            () => {
                                                elem.classList.remove(
                                                    `nm-a-${trigger.uid}`,
                                                )
                                            },
                                            endTriggerElems[i]!,
                                            false,
                                        )
                                    })
                                },
                                startTriggerElems,
                                true,
                            )
                        }

                        let endTriggerElems: (
                            | Element[]
                            | NodeListOf<Element>
                        )[] = []
                        trigger.endTriggers.map(trig => {
                            endTriggerElems.push(initializeTrigElems(trig))
                        })

                        let pauseTriggerElems: (
                            | Element[]
                            | NodeListOf<Element>
                        )[] = []
                        trigger.pauseTriggers.map(trig => {
                            pauseTriggerElems.push(initializeTrigElems(trig))
                        })

                        let resumeTriggerElems: (
                            | Element[]
                            | NodeListOf<Element>
                        )[] = []
                        trigger.resumeTriggers.map(trig => {
                            resumeTriggerElems.push(initializeTrigElems(trig))
                        })

                        trigger.pauseTriggers.map((pauseTrig, i) => {
                            registerEventCallback(
                                pauseTrig,
                                () => {
                                    ;(
                                        getElemsFromSelector(
                                            elem,
                                            nimauid,
                                            trigger.startTrigger.target,
                                            trigger.startTrigger.selector,
                                        ) as NodeListOf<HTMLElement>
                                    ).forEach(el => {
                                        el.style.setProperty(
                                            `--nm-p-${trigger.uid}`,
                                            "paused",
                                        )
                                    })
                                },
                                pauseTriggerElems[i]!,
                                true,
                            )
                        })

                        trigger.resumeTriggers.map((resumeTrig, i) => {
                            registerEventCallback(
                                resumeTrig,
                                () => {
                                    ;(
                                        getElemsFromSelector(
                                            elem,
                                            nimauid,
                                            trigger.startTrigger.target,
                                            trigger.startTrigger.selector,
                                        ) as NodeListOf<HTMLElement>
                                    ).forEach(el => {
                                        el.style.setProperty(
                                            `--nm-p-${trigger.uid}`,
                                            "running",
                                        )
                                    })
                                },
                                resumeTriggerElems[i]!,
                                true,
                            )
                        })
                    })
                })
            })
            /* console.log(`Built in ${Date.now() - loadTime}ms`) */
        }

        const observer = new MutationObserver((mutations: MutationRecord[]) => {
            /* console.log("DOM CHANGE") */
            for (const mutation of mutations) {
                for (let node of mutation.removedNodes) {
                    if (
                        node instanceof Element &&
                        node.getAttribute("data-nimauid")
                    ) {
                        Object.keys(eventListeners).map(animname => {
                            if (eventListeners[animname]?.has(node)) {
                                eventListeners[animname]!.get(
                                    node,
                                )!.abort.abort()
                                eventListeners[animname]!.delete(node)
                            }
                        })
                    }
                }
            }
            refreshElems()
        })
        observer.observe(document.body, {
            subtree: true,
            childList: true,
        })

        refreshElems()
    }
}
