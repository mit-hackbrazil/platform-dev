import React from "react";
export let TaskOpen = () =>
    <svg className="task-circle task-open task-svg" width='444' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'>
        <g id='Desktop' transform='translate(-337 -468)'>
            <g transform='translate(338 470)' id='task-open'>
                <circle id='task-open-circle' fill="#333" stroke='#FFF' strokeWidth='0' cx='20.5'
                    cy='20' r='20' />
                <polygon id='task-open-icon' fill='#FFF' points='31 21.8125 21.8125 21.8125 21.8125 31 19.1875 31 19.1875 21.8125 10 21.8125 10 19.1875 19.1875 19.1875 19.1875 10 21.8125 10 21.8125 19.1875 31 19.1875'
                />
            </g>
        </g>
    </svg>


export let TaskDefault = () =>
    <svg className="task-circle task-default task-svg" width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'>
        <g transform='translate(-490 -468)'>
            <g transform='translate(23 448)' fill='#000' fillRule='nonzero'>
                <circle id='task-default' cx='489' cy='42' r='20' stroke='#FFF' strokeWidth='0' fill="#111"
                />
            </g>
        </g>
    </svg>

export let TaskReady = () =>
    <svg className="task-circle task-ready" width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'>
        <g id='Page-1' fill='none' fillRule='evenodd'>
            <g id='Desktop' transform='translate(-183 -468)' fillRule='nonzero'>
                <g id='Group-2' transform='translate(23 448)'>
                    <g id='task-ready' transform='translate(162 22)'>
                        <circle id='task-ready' stroke='#FFF' strokeWidth='3' fill='#FFF' cx='20'
                            cy='20' r='20' />
                        <polygon id='Path' fill='#0B1719' points='31 14.0216245 17.1804537 28 10 20.7370208 11.9986538 18.7153963 17.1804537 23.956751 29.0013462 12'
                        />
                    </g>
                </g>
            </g>
        </g>
    </svg>
