import React from 'react';

// "Link: " In order to implement the singe page app without http req!
import { BrowserRouter, Route } from 'react-router-dom';

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

// const PageOne = () => {
//     return <Link to="/pageTwo">Page Two</Link>
// }

// const PageTwo = () => {
//     return <Link to="/">Page One</Link>;
// }

const App = () => {
    return(

        /* 
          "history" function always looks at the url bar on the browser.
           Then when the url in the url bar switches to another, the "history" again informs 
           the “just changed url” to <BrowserRouter/>. Then, <browserRouter>
           tries to match the informed url with the url/Route built in BrowserRouter.
           Therefore, url in the browser changes slightly faster than the component renders.
        */
       
        /*
            [finding "/"]
            Basically, localhost:3000 => is same as localhost:3000/
            Also, myapp.com => mayapp.com/
            For this reason, when we open the app only with the hostname,
            React-router-dom directs us to the <Router path=”/” … />
       */

        /* 
            [exact]
            The extracted “/page” contains the route “/” in the components => true because “/page” has “/” and “page”
            The extracted “/page” contains the route “/page” in the components => true because “/page” has “/” and “page”
            So when we use “/” or “/page” for “/page/new”, we need to define “exact” in the routes
            Or otherwise, they must be ordered at the last lines
        */

        /* 
            route path :
            Actually each route does have each page.
            Simply it blocks to render on the same page when the components have different path
            Therefore, as explained above in [exact], if "exact" of the main rout path is not available,
            that component is also rendered with the sub routes
            for instance
            <div>
                <pageOne />
                <pageTwo />
            </div>

            when they have "exact"
            <div>
                <pageTwo />
            </div>
        */
    /* 
        why should not use <a></a>
        <a> is a fully new client request by using HTTP. 
        Therefore, when we navigate with <a>, 
        it dumps out the all the previous memory ********
        like node gets new “req.body” or “req.redirect”. 
        Therefore, state value will deleted.
    */

    <div className="ui container">
    {/* 

        // at outside of <BrowserRoute />
        // BrowserRouter cannot not block render it in the browser.
        // Just Bear in mind again that React-router-dom itself as literally specified
        //  is to block the dom-based component rendering in the browser if the url given the compoenent
        //  are not matched with URL from the url bar. That is why React is single page app.
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

                <Route path="/" exact component={ StreamList } />
                <Route path="/streams/new" component={ StreamCreate } />
                <Route path="/streams/edit" component={ StreamEdit } />
                <Route path="/streams/delete" component={ StreamDelete } />
                <Route path="/streams/show" component={ StreamShow } />



                {/* exact is used for the root directory only */}
                {/* 
                
                    <Route path="/" exact component={ PageOne } />
                    <Route path="/pageTwo" component = { PageTwo } />
                */}


            </div>
        </BrowserRouter>
    </div>
    );
}

export default App;