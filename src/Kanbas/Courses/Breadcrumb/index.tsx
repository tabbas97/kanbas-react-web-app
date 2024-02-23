import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import "./index.css";
import "../../index.css";

function BreadCrumbNav() {
    // const {coursePath} = useParams();

    const path = useLocation().pathname;
    const urlSegs = path ? path.split("/") : [];
    console.log("Path: " + path);
    console.log(urlSegs);

    // Check if the path is empty
    if (urlSegs.length < 3) {
        // Return the home breadcrumb with a horizontal line below it
        return (<nav aria-label="breadcrumb" className='d-flex align-items-center breadcrumb-hg-80'>
            <RxHamburgerMenu className='m-3 mb-0 wd-link-red'/>
            <ol className="breadcrumb">
                <li className='breadcrumb-item active' aria-current="page">
                    Home
                </li>
            </ol>
            <hr className= "mb-3 mx-3"/>
            {/* <hr/> */}
        </nav>
        );
    } else {
        // Find index of "course"
        const courseInd = urlSegs.indexOf("Courses");

        // The following elements will be used to build the breadcrumb
        let elements = [];

        if (courseInd !== -1) {
            // If we are in a course, add the course name to the breadcrumb
            if (courseInd + 2 < urlSegs.length) {
                // Add every element following the course name to the breadcrumb
                for (let i = courseInd + 1; i < urlSegs.length - 1; i++) {
                    elements.push(
                        <li className='breadcrumb-item'>
                            <Link key={urlSegs[i]} className='wd-link-red' to={''}>
                                {urlSegs[i]}
                            </Link>
                        </li>
                    )
                }
                // const courseName = urlSegs[courseInd + 1];
                
                // elements.push(
                //     <li className='breadcrumb-item'>
                //         <Link key={courseName} className='wd-link-red' to={''}>
                //             {courseName}
                //         </Link>
                //     </li>
                // )
            }
        } else {
            // If we are not in a course, return nothing
            elements.push(
                <li className='breadcrumb-item active' aria-current="page">
                    Home
                </li>
            )
        }

        // Add the last element to the breadcrumb
        if (urlSegs[urlSegs.length - 1] !== "") {
            elements.push(
                <li className='breadcrumb-item active' aria-current="page">
                    {urlSegs[urlSegs.length - 1]}
                </li>
            )
        }

        return (
            <nav aria-label="breadcrumb" className='d-flex align-items-center align-middle breadcrumb-hg-80'>
                <RxHamburgerMenu className='m-3 mb-0 wd-link-red'/>
                <ol className="breadcrumb m-3 mb-0 ms-0">
                    {elements}
                </ol>
                {/* <hr style={{color: "red"}}/> */}
                <hr className= "mb-3 mx-3"/>
            </nav>
        )
    }
    

    // Parse the tab in the URL
    // const path = window.location.hash;
    // const urlSegs = path.split("/");

    // // Get the course name
    // const courseInd = urlSegs.indexOf("Courses");

    // console.log(urlSegs);

    // if (courseInd != 1) {
    //     // If we are not in a course, return nothing
    //     if (courseInd + 3 < urlSegs.length) {
    //         const courseName = urlSegs[courseInd + 2];
    //         const specItem = urlSegs[courseInd + 3];
    //         return (
    //             <>
    //                 <li className='breadcrumb-item'>
    //                     <Link key={courseName} className='wd-link-red' to={''}>
    //                         {courseName}
    //                     </Link>
    //                 </li>
    //                 <li className='breadcrumb-item active' aria-current="page">
    //                     {specItem}
    //                 </li>
    //             </>
    //         )
    //     } else if (courseInd + 2 < urlSegs.length) {
    //         const courseName = urlSegs[courseInd + 2];
    //         return (
    //             <li className='breadcrumb-item active' aria-current="page">
    //                 {courseName}
    //             </li>
    //         )
    //     }
    // }
    // return (
    //     <li className='breadcrumb-item active' aria-current="page">
    //         Home
    //     </li>
    // );
}

export default BreadCrumbNav;