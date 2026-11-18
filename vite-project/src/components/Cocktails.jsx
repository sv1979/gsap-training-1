import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useMediaQuery } from 'react-responsive';
import {cocktailLists, mockTailLists} from '../../constants/index';

const Cocktails = () => {

    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#cocktails',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        });
        parallaxTimeline.from('#c-left-leaf', { x: -100, y: 100, scale: 0.5 });
        parallaxTimeline.from('#c-right-leaf', { x: 100, y: 100 });
    });

    return (
        <section id="cocktails" className="noisy">
            <img src="/images/cocktail-left-leaf.png"
                id="c-left-leaf"
                alt="cocktails-bg"
                className="cocktails-bg" />
            <img src="/images/cocktail-right-leaf.png"
                id="c-right-leaf"
                alt="cocktails-bg"
                className="cocktails-bg" />
            <div className="list">
                <div className="popular">
                    <h2>Most popular cocktails:</h2>

                    <ul>
                        {cocktailLists.map((cocktail) => (
                            <li key={cocktail.name}>
                                <div className="md:me-28">
                                    <h3>{cocktail.name}</h3>
                                    <p>{cocktail.country} |  {cocktail.detail}</p>
                                </div>
                                <span>- {cocktail.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="loved">
                    <h2>Most popular mocktails:</h2>

                    <ul>
                        {mockTailLists.map((cocktail) => (
                            <li key={cocktail.name}>
                                <div className="md:me-28">
                                    <h3>{cocktail.name}</h3>
                                    <p>{cocktail.country} |  {cocktail.detail}</p>
                                </div>
                                <span>- {cocktail.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Cocktails;