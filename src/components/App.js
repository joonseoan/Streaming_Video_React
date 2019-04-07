import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

// "Link: " In order to implement the singe page app without http req!
// const PageOne = () => {
//     return <Link to="/pageTwo">Page Two</Link>
// }

// const PageTwo = () => {
//     return <Link to="/">Page One</Link>;
// }

// const TestStreamPage = () => {
//     return<div>TestPage</div>;
// }

const App = () => {
    return(

        /***************************************************************************************************************************
            "history" function always looks at the url bar on the browser.
            Then when the url in the url bar switches to another, 
                    the "history" function again informs <BrowserRouter/> the “just changed url”. 
            Then again, <browserRouter> tries to match the informed url with the url/Route built in BrowserRouter.
            Therefore, url in the browser changes slightly faster than the component renders.
        ****************************************************************************************************************************/
       
        /*
            [ finding "/" ]
            Basically, localhost:3000 => is same as "localhost:3000/"
            Also, myapp.com => mayapp.com/, for instance.
            For this reason, when we open the app only with the hostname,
            "React-router-dom" directs us to the <Router path=”/” … />
       */

        /****************************************************************************************************************************
            [ exact ]
            The extracted “/page” from url bar contains the route “/” of the components => true (because the “/page” has “/” and “page”)
            The extracted “/page” from url bar contains the route “/page” in the components => true (because the “/page” has “/” and “page”)
            So when we use “/” or “/page” for “/page/new”, we need to define “exact” in the routes
            
            Another reason we must use "exact" here is because :
            - <Header /> has also a "/" route as mentioned up and above. It shows up at any pages
            - Therefore, we need to separate it from <Route path="/" exact />. It shows up only at "/" page

            Or otherwise, they must be ordered at the last lines
            <Switch /> can be used to resolve all issues above, BTW.
        *****************************************************************************************************************************/

        /* 
            route path :
            Actually each route does not have each page. All pages are in a same page.
            Instead, it blocks to render on the same page when the component paths are not identical with the url path.
        */

        /**************************************************************************************************************************** 
            Why should not use <a></a> in React or Redux
            1) <a> is a fully new client request by using HTTP.
                It has dependancy on the network. Therefore it can be slower.
            2) Also, when we navigate with <a> for instance in a navigation bar, 
                it dumps out the all the previous memories ******************* when it moves to the anouther menu.
        *****************************************************************************************************************************/

        <div className="ui container">
        {/* 

            // at outside of <BrowserRoute />
            // BrowserRouter cannot not block render it in the browser.
            // Just Bear in mind again that React-router-dom itself
            //  is to block the dom-based components rendering to the browser 
            //  if the url given the compoenent are not matched 
            //  with URL from the url bar. That is why React is single page app.
            <h1>Header!!!</h1>

            However!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
            In this case, we can't use <Link> react-router-dom!!!!!!!!!!!!!!!!!
            
            In order to make use of the react-router
            Header should be inside BrowserRouter with no specification of "url path"
        */}
            
            <BrowserRouter>
                <Header />
                {/* must have <div /> */}
                <div>
                {/* 
                    <Route path="/" exact component={ PageOne } />
                    <Route path="/pageTwo" component = { PageTwo } />
                */}
                    <Route path="/" exact component={ StreamList } />
                    {/* 
                        Basically, it will show up in every single /streams/* page
                        if the one below exists.

                        <Route path="/streams" component={ TestStreamPage } />
                    */}
                    <Route path="/streams/new" component={ StreamCreate } />
                    <Route path="/streams/edit" component={ StreamEdit } />
                    <Route path="/streams/delete" component={ StreamDelete } />
                    <Route path="/streams/show" component={ StreamShow } />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;