import React from 'react'
import './Calender.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
export default function Calender(props) {
    const mani = function (value) {
        if (value >= 1 && value <= 3) {
            return 1;
        }
        if (value >= 4 && 6 >= value) {
            return 2;
        }
        if (value >= 7) {
            return 3;
        }
        return 0;
    }

    return (
        <>
            <div class="graph">
                <ul class="months">
                    <li>Jan</li>
                    <li>Feb</li>
                    <li>Mar</li>
                    <li>Apr</li>
                    <li>May</li>
                    <li>Jun</li>
                    <li>Jul</li>
                    <li>Aug</li>
                    <li>Sep</li>
                    <li>Oct</li>
                    <li>Nov</li>
                    <li>Dec</li>
                </ul>

                <ul class="squares">
                    {
                        props.calender.map((element) => {
                            return (<Tippy content={element.value + ' Solved'}><li data-level={mani(element.value)} class="tile"></li></Tippy>)
                        })
                    }

                </ul>
            </div>
        </>
    )
}