import RedBullShowCase from "../images/redbull-showcase.webm"
import RikaShowCase from "../images/rika-showcase.webm"
import NeohShowCase from "../images/neoh-showcase.webm"
import SarahShowcase from "../images/sarah-portfolio-showcase.webm"
import HiShareThatShowcase from "../images/hisharethat-showcase.png"
import ClassNinjas from "../images/classninjas-showcase-1.png"
import GooglePlayImage from "../images/google-play.svg"
import AppleStoreImage from "../images/app-store.svg"
import ExternalLinkIcon from "../images/external-link.svg"
import React, { Fragment } from "react"

const projectData = [
  {
    image: RedBullShowCase,
    header: "Red Bull",
    tag: "video",
    text: "Having fun with music and music licensing",
    detail_html: `
    <h3>The brief</h3>
    <p></p>
    <br>
    <h3>My contribution to the project</h3>
    <p></p>
    <h3>Have a look for yourself</h3>
    <p></p>
  `
  },
  {
    image: ClassNinjas,
    header: "ClassNinjas",
    tag: "img",
    text: "Learning math with shurikens and time-travel",
    detail_html: 
      <Fragment>
        <h3>The brief</h3>
        <p>ClassNinjas came to us with the plan of creating a math learning app on web and mobile, with interesting math exercises and some gamification elements, to make it more accessible to the target audience (ages 11-17). In more recent times, their business has pivoted towards math tutoring.</p>
        <br />
        <h3>My contribution to the project</h3>
        <p>The team brought me in to the project at the stage where the first versions of the mobile app had already been built, but they wanted to add a few more features that would make it appealing to the users; a Progress tab that tracks how many exercises you have completed in the last week, that comes with a graph and the ability to share your progress; and a Challenge tab, (which I think I enjoyed working on the most) for the children to battle each other at a quick-fire quiz to see who would get more correct answers, together with a leaderboard and challenge profile. </p>
        <p>Other smaller features I worked on include the ability for the CLassNinjas team to write exercises and hints using rich text, a re-design of the navigation and a modal for users to pick their username before </p>
        <p>I also spearheaded the development process for their new website, which integrated CraftCMS and Shopify, while keeping things relatively simple on the front-end with good old vanilla Javascript.</p>
        <h3>Have a look for yourself</h3>

        <div className="icon-flex__container">
          <a className="icon-flex icon-flex__store" href="https://apps.apple.com/app/classninjas-mathe-lernen/id1488922442">
            <img src={AppleStoreImage} />
            </a>
            <a className="icon-flex icon-flex__store" href="https://play.google.com/store/apps/details?id=com.classninjas">
              <img src={GooglePlayImage} />
          </a>
        </div>
        <a className="icon-flex icon-flex__website icon-flex__website--cn" href="https://www.classninjas.com/app">
            View Website
              <img src={ExternalLinkIcon} />
        </a>
      </Fragment>
    
  },
  {
    image: SarahShowcase,
    header: "Sarah Houben Portfolio",
    tag: "video",
    text: "Photography portfolio built with an experimental framework",
    detail_html: `
    <h3>The brief</h3>
    <p></p>
    <br>
    <h3>What I did</h3>
    <p></p>
    <h3>Have a look for yourself</h3>
   
    <p></p>
  `
  },
  {
    image: NeohShowCase,
    header: "NEOH",
    tag: "video",
    text: "Full-snack development",
    detail_html: `
    <h3>The brief</h3>
    <p>ClassNinjas came to us with the plan of creating a math learning app on web and mobile, with interesting math exercises and some gamification elements, to make it more accessible to the target audience (ages 11-17). Later, their business has pivoted towards math tutoring.</p>
    <br>
    <h3>My contribution to the project</h3>
    <p></p>
    <h3>Have a look for yourself</h3>
    <p></p>
  `
  },
  {
    image: HiShareThatShowcase,
    header: "hi!share.that",
    tag: "img",
    text: "Clicks and conversions: performance-based influencer marketing",
    detail_html: `
    <h3>The brief</h3>
    <p>ClassNinjas came to us with the plan of creating a math learning app on web and mobile, with interesting math exercises and some gamification elements, to make it more accessible to the target audience (ages 11-17). Later, their business has pivoted towards math tutoring.</p>
    <br>
    <h3>My contribution to the project</h3>
    <p></p>
    <h3>Have a look for yourself</h3>
    <p></p>
  `
  },
  {
    image: RikaShowCase,
    header: "Soseisoudou Online Store",
    tag: "video",
    text: "Beautiful felt-wool clothing made in Hokkaido (Japan)",
    detail_html: `
    <h3>The brief</h3>
    <p></p>
    <br>
    <h3>What I did</h3>
    <p></p>
    <h3>Have a look for yourself</h3>
    <p></p>
  `
  },
]

export default projectData;